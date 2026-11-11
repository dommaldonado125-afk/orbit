export async function onRequestGet({ request, env }) {
  const q = new URL(request.url).searchParams.get("q")?.trim();
  if (!q) return Response.json({ results: [] });
  if (!env.BRAVE_SEARCH_API_KEY) return Response.json({ error: "Configure BRAVE_SEARCH_API_KEY in Cloudflare Pages secrets." }, { status: 503 });
  const upstream = await fetch("https://api.search.brave.com/res/v1/web/search?q=" + encodeURIComponent(q), {
    headers: { "X-Subscription-Token": env.BRAVE_SEARCH_API_KEY, "Accept": "application/json" }
  });
  if (!upstream.ok) return Response.json({ error: "Search provider error." }, { status: 502 });
  const data = await upstream.json();
  return Response.json({ results: (data.web?.results || []).slice(0, 8).map(x => ({ title: x.title, url: x.url, description: x.description })) });
}
