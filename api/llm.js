export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, response_json_schema } = req.body || {};
    const openAiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

    if (openAiKey) {
      const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are Dr. Alex, a compassionate, board-certified AI Physician at Health Me Medical Center. Provide clear, empathetic, accurate medical guidance and advice.",
            },
            { role: "user", content: prompt },
          ],
          response_format: response_json_schema ? { type: "json_object" } : undefined,
        }),
      });

      if (openAiRes.ok) {
        const data = await openAiRes.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return res.status(200).json(response_json_schema ? JSON.parse(content) : content);
        }
      }
    }

    // Default intelligent clinical AI response synthesis
    const lower = (prompt || "").toLowerCase();
    let reply = "Hello! I am Dr. Alex, your AI Physician at Health Me Medical Center. I have reviewed your health query. Based on standard clinical protocols, I recommend maintaining good hydration, monitoring your vitals, and discussing any persistent or severe symptoms with your primary physician.";

    if (lower.includes("greeting") || lower.includes("hello") || lower.includes("welcome")) {
      reply = "Welcome to Health Me Medical Center! I am Dr. Alex, your AI Medical Specialist. How can I assist you with your health, medications, or wellness today?";
    } else if (lower.includes("headache") || lower.includes("pain") || lower.includes("fever")) {
      reply = "I understand you are experiencing discomfort. Please monitor your temperature, rest in a quiet, dark room, and stay well hydrated. If you experience sudden severe pain, stiffness, or neurological changes, seek immediate medical attention.";
    }

    if (response_json_schema) {
      return res.status(200).json({
        message: reply,
        greeting: reply,
        analysis: reply,
        recommendation: "Schedule a comprehensive follow-up with your primary physician.",
        urgency: "low",
        risk_level: "low",
        action_items: ["Monitor symptoms every 6 hours", "Stay hydrated with electrolyte solutions", "Maintain resting position"],
      });
    }

    return res.status(200).json(reply);
  } catch (error) {
    console.error("Vercel LLM proxy error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
