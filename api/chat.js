/* global process */

/**
 * Vercel Serverless Function — /api/chat
 * Proxies chat requests to OpenAI so the API key is never exposed to the browser.
 *
 * Set OPENAI_API_KEY in the Vercel dashboard:
 *   Project > Settings > Environment Variables
 */

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 800;
const MAX_TOTAL_CONTENT_LENGTH = 12000;

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API not configured on server" });
  }

  const { messages } = req.body || {};

  // Validate input
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages must be a non-empty array" });
  }
  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: "Too many messages" });
  }
  const totalContentLength = messages.reduce(
    (sum, message) => sum + (typeof message?.content === "string" ? message.content.length : 0),
    0
  );
  if (totalContentLength > MAX_TOTAL_CONTENT_LENGTH) {
    return res.status(400).json({ error: "Conversation too large" });
  }
  for (const m of messages) {
    if (typeof m.role !== "string" || typeof m.content !== "string") {
      return res.status(400).json({ error: "Invalid message format" });
    }
    if (m.role !== "system" && m.content.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: "Message too long" });
    }
  }

  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.25,
        max_tokens: 260,
        messages,
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return res.status(upstream.status).json({ error: text });
    }

    const data = await upstream.json();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
}
