// Conversion events go through Base44's built-in analytics. The SDK is loaded
// lazily so it never sits on the landing page's critical path.
export function track(eventName, properties) {
  import("@/api/base44Client")
    .then(({ base44 }) => base44.analytics?.track({ eventName, properties }))
    .catch(() => {});
}
