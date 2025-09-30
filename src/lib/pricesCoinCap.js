
export async function fetchPricesCoinCap(ids = ["bitcoin","ethereum","solana","xrp","cardano"]) {
  const TOKEN = import.meta.env.VITE_COINCAP_TOKEN;
  if (!TOKEN) throw new Error("Missing VITE_COINCAP_TOKEN");
  const url = `https://api.coincap.io/v2/assets?ids=${ids.join(",")}&fields=id,priceUsd,changePercent24Hr,symbol`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }});
  if (!res.ok) throw new Error("CoinCap fetch failed");
  const { data } = await res.json();
  const out = {};
  for (const a of data) {
    out[a.id] = { usd: Number(a.priceUsd), usd_24h_change: Number(a.changePercent24Hr) };
  }
  return out;
}
