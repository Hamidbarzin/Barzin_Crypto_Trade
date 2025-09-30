const EMBED_FALLBACK = [
  {
    id: "news1",
    title: "بیت‌کوین در نزدیکی سطح مقاومت 100,000 دلاری",
    source: "BarzinCrypto",
    url: "#",
    published_at: "2025-01-09T12:00:00Z",
    tags: ["BTC", "Market"]
  },
  {
    id: "news2",
    title: "اتریوم 2.0 و تحولات جدید در شبکه",
    source: "Crypto News",
    url: "#",
    published_at: "2025-01-09T10:30:00Z",
    tags: ["ETH", "Technology"]
  },
  {
    id: "news3",
    title: "سولانا رکورد جدیدی در تراکنش‌های روزانه ثبت کرد",
    source: "DeFi Report",
    url: "#",
    published_at: "2025-01-09T08:15:00Z",
    tags: ["SOL", "DeFi"]
  },
  {
    id: "news4",
    title: "تحلیل تکنیکال: آلت‌کوین‌ها در آستانه رشد بزرگ",
    source: "Technical Analysis",
    url: "#",
    published_at: "2025-01-08T16:45:00Z",
    tags: ["Analysis", "Altcoins"]
  }
];

export async function fetchNews(limit = 30) {
  console.log("📰 Starting news fetch process...");

  // First, always try local static files
  const candidates = ["/news.json", "/public/news.json", "/static/news.json"];
  for (const path of candidates) {
    try {
      console.log(`🔍 Trying to fetch news from: ${path}`);
      const response = await fetch(path, { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          console.log(`✅ Successfully loaded ${data.length} news items from ${path}`);
          return data.slice(0, limit);
        }
      }
    } catch (error) {
      console.log(`❌ Error fetching from ${path}:`, error.message);
    }
  }

  // Fallback to embedded data
  console.log("🔄 Using embedded fallback news data");
  return EMBED_FALLBACK.slice(0, limit);
}