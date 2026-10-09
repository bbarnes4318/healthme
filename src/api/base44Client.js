import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

const rawClient = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});

// Proxy handler to ensure entity list() and filter() always return Arrays
const entitiesProxy = new Proxy(rawClient.entities || {}, {
  get(target, entityName) {
    const entity = target[entityName] || {};
    return new Proxy(entity, {
      get(eTarget, prop) {
        const origMethod = eTarget[prop];
        if (typeof origMethod === 'function') {
          return async (...args) => {
            try {
              const res = await origMethod.apply(eTarget, args);
              if (prop === 'list' || prop === 'filter') {
                return Array.isArray(res) ? res : [];
              }
              return res;
            } catch (err) {
              if (prop === 'list' || prop === 'filter') {
                return [];
              }
              return null;
            }
          };
        }
        return origMethod;
      }
    });
  }
});

// Proxy handler for integrations (Core.InvokeLLM)
const integrationsProxy = new Proxy(rawClient.integrations || {}, {
  get(target, serviceName) {
    const service = target[serviceName] || {};
    return new Proxy(service, {
      get(sTarget, methodName) {
        const origMethod = sTarget[methodName];
        return async (...args) => {
          try {
            const res = await origMethod.apply(sTarget, args);
            if (res) return res;
          } catch (err) {
            console.warn(`base44.integrations.${serviceName}.${methodName} failed, using serverless fallback:`, err.message);
          }
          // Serverless LLM Fallback Handler
          const [payload] = args;
          try {
            const res = await fetch("/api/llm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload || {}),
            });
            if (res.ok) {
              const data = await res.json();
              return data;
            }
          } catch (e) {
            console.warn("Client fallback to /api/llm failed:", e);
          }
          const prompt = payload?.prompt || "";
          return payload?.response_json_schema
            ? { message: "Welcome to Health Me Medical Center. I am Dr. Alex, your AI Medical Specialist. How can I assist you with your health today?" }
            : "Welcome to Health Me Medical Center. I am Dr. Alex, your AI Medical Specialist. How can I assist you with your health today?";
        };
      }
    });
  }
});

export const base44 = new Proxy(rawClient, {
  get(target, prop) {
    if (prop === 'entities') {
      return entitiesProxy;
    }
    if (prop === 'integrations') {
      return integrationsProxy;
    }
    return target[prop];
  }
});
