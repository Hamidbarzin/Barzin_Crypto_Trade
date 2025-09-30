
import { useEffect, useRef, useState } from "react";
import { fetchPrices } from "../lib/prices";

export default function CoinRow() {
  const ids = ["bitcoin","ethereum","solana","xrp","cardano"];
  const [p, setP] = useState(null);
  const timerRef = useRef(null);
  const abortRef = useRef(null);

  async function load() {
    abortRef.current?.abort();
    const ac = new AbortController(); abortRef.current = ac;
    try {
      const data = await fetchPrices(ids, { signal: ac.signal });
      setP(data);
    } catch(e) {
      if (e.name !== "AbortError") console.error("price load failed", e);
    }
  }

  useEffect(() => {
    let alive = true;
    const start = () => {
      if (document.hidden) return;   // pause when tab hidden
      load();
      timerRef.current = setInterval(load, 60_000);
    };
    const stop = () => { clearInterval(timerRef.current); timerRef.current = null; abortRef.current?.abort(); };

    start();
    const onVis = () => { stop(); start(); };
    document.addEventListener("visibilitychange", onVis);

    return () => { alive = false; document.removeEventListener("visibilitychange", onVis); stop(); };
  }, []);

  if (!p) return null;
  const meta = [
    { id: "bitcoin", sym: "BTC" },
    { id: "ethereum", sym: "ETH" },
    { id: "solana", sym: "SOL" },
    { id: "xrp",     sym: "XRP" },
    { id: "cardano", sym: "ADA" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {meta.map(({id,sym}) => {
        const v = p[id]; if (!v) return null;
        const price = (v.usd ?? v.usd)?.toLocaleString();
        const ch = Number(v.usd_24h_change ?? v.usd_24h_change || 0).toFixed(2);
        return (
          <div key={id} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="text-sm text-white/60">{sym}</div>
            <div className="text-xl font-semibold">${price}</div>
            <div className={Number(ch) >= 0 ? "text-emerald-400" : "text-red-400"}>
              {Number(ch) >= 0 ? "+" : ""}{ch}% / 24h
            </div>
          </div>
        );
      })}
    </div>
  );
}
