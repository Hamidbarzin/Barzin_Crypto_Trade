import React, { useEffect, useRef, useState } from "react";
import { fetchNewsLive } from "../lib/newsLive";

export default function News() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const abortRef = useRef(null);
  const timerRef = useRef(null);

  async function load() {
    abortRef.current?.abort();
    const ac = new AbortController(); abortRef.current = ac;
    try {
      const data = await fetchNewsLive(40, { signal: ac.signal });
      setList(data);
    } catch(e) {
      if (e.name !== "AbortError") console.error("news load failed", e);
    } finally { setLoading(false); }
  }

  useEffect(() => {
    const start = () => {
      if (document.hidden) return;
      load();
      timerRef.current = setInterval(load, 5 * 60_000); // every 5 min
    };
    const stop = () => { clearInterval(timerRef.current); timerRef.current=null; abortRef.current?.abort(); };

    start();
    const onVis = () => { stop(); start(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { document.removeEventListener("visibilitychange", onVis); stop(); };
  }, []);

  const filtered = list
    .filter(n => {
      if (!q.trim()) return true;
      const qq = q.toLowerCase();
      return (n.title||"").toLowerCase().includes(qq) || (n.source||"").toLowerCase().includes(qq);
    })
    .sort((a,b)=> sort==="newest" ? new Date(b.published_at)-new Date(a.published_at) : new Date(a.published_at)-new Date(b.published_at));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Galaxy Background via iframe */}
      <iframe 
        src="/galaxy-rich-background.html"
        className="absolute inset-0 w-full h-full border-0"
        style={{ zIndex: 1 }}
        title="Galaxy Background"
      />
      
      {/* Main Content Overlay */}
      <div className="relative z-10 min-h-screen bg-[#0b0e14]/60 text-white">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold">Crypto News</h1>
          <div className="flex items-center gap-2">
            <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-xl bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10">
              <option value="newest">Newest</option><option value="oldest">Oldest</option>
            </select>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" className="w-64 rounded-xl bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 placeholder:text-white/40"/>
          </div>
        </div>

        {loading ? (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({length:6}).map((_,i)=>(<li key={i} className="h-28 animate-pulse rounded-2xl bg-white/5 ring-1 ring-white/10" />))}
          </ul>
        ) : filtered.length===0 ? (
          <div className="mt-20 text-center text-white/60">No results.</div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map(n=>(
              <li key={n.id} className="group rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/10">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-white/50">{n.source}</span>
                  <span className="text-xs text-white/50">{new Date(n.published_at).toLocaleString()}</span>
                </div>
                <a href={n.url||"#"} target="_blank" rel="noreferrer"><h3 className="line-clamp-2 text-base font-medium group-hover:text-cyan-300">{n.title}</h3></a>
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  );
}