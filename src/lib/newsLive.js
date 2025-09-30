const TTL = 5 * 60 * 1000; // 5 min
const KEY = "news_cache_v1";

export async function fetchNewsLive(limit = 30, { signal } = {}) {
  try {
    const cached = JSON.parse(localStorage.getItem(KEY) || "null");
    if (cached && (Date.now() - cached.time < TTL)) return cached.data.slice(0, limit);
  } catch {}

  // 1) CryptoPanic (if token provided)
  const CP = import.meta.env.VITE_CRYPTOPANIC_TOKEN;
  if (CP) {
    try {
      const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${CP}&public=true&kind=news&filter=rising,hot&currencies=BTC,ETH,SOL,ADA,XRP`;
      const r = await fetch(url, { cache:"no-store", signal });
      if (r.ok) {
        const j = await r.json();
        const data = (j.results||[]).map(x=>({
          id: `cp_${x.id}`, title: x.title, url: x.url,
          source: x.source?.title || "CryptoPanic",
          published_at: x.published_at, tags: (x.currencies||[]).map(c=>c.code)
        }));
        localStorage.setItem(KEY, JSON.stringify({ time: Date.now(), data }));
        return data.slice(0, limit);
      }
    } catch {}
  }

  // 2) RSS via AllOrigins
  try {
    const srcs = [
      "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://www.coindesk.com/arc/outboundfeeds/rss/"),
      "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://cointelegraph.com/rss")
    ];
    const items = [];
    for (const u of srcs) {
      try {
        const t = await (await fetch(u, { cache:"no-store", signal })).text();
        const xml = new DOMParser().parseFromString(t, "text/xml");
        Array.from(xml.querySelectorAll("item")).slice(0,15).forEach(n=>{
          items.push({
            id: (n.querySelector("guid")?.textContent || n.querySelector("link")?.textContent || Math.random().toString(36).slice(2)),
            title: n.querySelector("title")?.textContent || "Untitled",
            url: n.querySelector("link")?.textContent || "#",
            source: t.includes("coindesk") ? "CoinDesk" : "Cointelegraph",
            published_at: n.querySelector("pubDate")?.textContent || new Date().toISOString(),
            tags: []
          });
        });
      } catch {}
    }
    if (items.length) {
      items.sort((a,b)=> new Date(b.published_at) - new Date(a.published_at));
      localStorage.setItem(KEY, JSON.stringify({ time: Date.now(), data: items }));
      return items.slice(0, limit);
    }
  } catch {}

  // 3) local fallback
  const r = await fetch("/news.json", { cache:"no-store", signal });
  const data = r.ok ? await r.json() : [];
  localStorage.setItem(KEY, JSON.stringify({ time: Date.now(), data }));
  return data.slice(0, limit);
}