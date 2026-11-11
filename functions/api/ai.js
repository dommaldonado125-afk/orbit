export async function onRequestPost({ request, env }) {
  const { prompt } = await request.json();
  if (!prompt || typeof prompt !== "string") return Response.json({ error: "A prompt is required." }, { status: 400 });
  if (!env.OPENAI_API_KEY) return Response.json({ error: "Configure OPENAI_API_KEY in Cloudflare Pages secrets." }, { status: 503 });
  const upstream = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-4.1-mini", input: prompt, max_output_tokens: 500 })
  });
  if (!upstream.ok) return Response.json({ error: "AI provider error." }, { status: 502 });
  const data = await upstream.json();
  const answer = (data.output || []).flatMap(x => x.content || []).filter(x => x.type === "output_text").map(x => x.text).join("\n");
  return Response.json({ answer });
}
