
import { fetchPricesCoinCap } from "./pricesCoinCap";
export async function fetchPrices(ids) {
  try {
    return await fetchPricesCoinCap(ids);
  } catch {
    const list = ids?.length ? ids : ["bitcoin","ethereum","solana","xrp","cardano"];
    const g = `https://api.coingecko.com/api/v3/simple/price?ids=${list.join(",")}&vs_currencies=usd&include_24hr_change=true`;
    const r = await fetch(g);
    if (!r.ok) throw new Error("CoinGecko fallback failed");
    return await r.json();
  }
}
