
(() => {
  const STYLE = `
  .news-wrap{max-width:1100px;margin:0 auto;padding:24px;color:#fff}
  .news-toolbar{display:flex;gap:8px;justify-content:space-between;align-items:center;margin-bottom:12px}
  .news-grid{display:grid;gap:12px;grid-template-columns:1fr; }
  @media (min-width:720px){ .news-grid{grid-template-columns:1fr 1fr} }
  .news-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:16px;transition:all 0.2s ease;cursor:pointer}
  .news-card:hover{background:rgba(255,255,255,.1);transform:translateY(-2px)}
  .news-meta{display:flex;justify-content:space-between;opacity:.7;font-size:12px;margin-bottom:6px}
  .news-source{color:#7dd3fc}
  .news-a{color:#fff;text-decoration:none;font-weight:600;font-size:16px;line-height:1.4;display:block}
  .news-a:hover{color:#7dd3fc}
  input.news-q,select.news-s{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:8px 10px;color:#fff;outline:none}
  input.news-q:focus,select.news-s:focus{border-color:#7dd3fc}
  .news-tags{margin-top:12px;display:flex;gap:6px;flex-wrap:wrap}
  .news-tag{background:rgba(124,58,237,.2);color:#a78bfa;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:500}
  `;
  
  function h(tag, attrs={}, children=[]) { 
    const el = document.createElement(tag); 
    for (const k in attrs) el.setAttribute(k, attrs[k]); 
    children.forEach(c=>el.append(c)); 
    return el; 
  }

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR');
    } catch {
      return dateString;
    }
  }

  function render(list, root){
    const wrap = root.querySelector('.news-content') || root;
    wrap.innerHTML = "";
    
    const toolbar = h("div", {class:"news-toolbar"}, [
      h("div", {}, [document.createTextNode(`اخبار: ${list.length}`)]),
      h("div", {style:"display:flex;gap:8px"}, [
        q, s
      ])
    ]);
    
    const grid = h("div", {class:"news-grid"});
    list.forEach(n=>{
      const card = h("div", {class:"news-card"});
      
      const meta = h("div", {class:"news-meta"}, [
        h("span", {class:"news-source"}, [document.createTextNode(n.source || "محلی")]),
        h("span", {}, [document.createTextNode(formatDate(n.published_at))])
      ]);
      
      const a = h("a", {
        class:"news-a", 
        href: n.url || "#", 
        target:"_blank", 
        rel:"noreferrer"
      }, [document.createTextNode(n.title)]);
      
      card.append(meta, a);
      
      if (n.tags && n.tags.length > 0) {
        const tagsDiv = h("div", {class:"news-tags"});
        n.tags.forEach(tag => {
          tagsDiv.append(h("span", {class:"news-tag"}, [document.createTextNode(tag)]));
        });
        card.append(tagsDiv);
      }
      
      grid.append(card);
    });
    
    wrap.append(toolbar, grid);
  }

  // mount
  const script = document.currentScript;
  const src = script?.dataset?.src || "/news.json";
  const targetId = script?.dataset?.target || "news";
  const wrap = document.getElementById(targetId) || (()=>{ 
    const d=document.createElement("div"); 
    d.id=targetId; 
    document.body.appendChild(d); 
    return d; 
  })();

  // style
  if (!document.getElementById('news-widget-style')) {
    const style = document.createElement("style"); 
    style.id = 'news-widget-style';
    style.textContent = STYLE; 
    document.head.appendChild(style);
  }
  
  wrap.classList.add("news-wrap");

  // toolbar controls (search + sort)
  const q = h("input", {class:"news-q", placeholder:"جستجو...", type:"search"});
  const s = h("select", {class:"news-s"}, [
    h("option",{value:"newest"},["جدیدترین"]), 
    h("option",{value:"oldest"},["قدیمی‌ترین"])
  ]);
  let data = [];

  function apply(){
    let arr = [...data];
    const qq = q.value.trim().toLowerCase();
    if (qq) {
      arr = arr.filter(n => 
        (n.title||"").toLowerCase().includes(qq) || 
        (n.source||"").toLowerCase().includes(qq) ||
        (n.tags||[]).some(tag => tag.toLowerCase().includes(qq))
      );
    }
    arr.sort((a,b)=> 
      s.value==="newest" 
        ? new Date(b.published_at)-new Date(a.published_at) 
        : new Date(a.published_at)-new Date(b.published_at)
    );
    render(arr, wrap);
  }
  
  q.addEventListener("input", apply); 
  s.addEventListener("change", apply);

  // fetch data
  console.log("🔍 Loading news from:", src);
  fetch(src, {cache:"no-store"})
    .then(r=>{
      console.log("📡 News fetch response:", r.status);
      return r.json();
    })
    .then(json=>{
      console.log("📰 News data loaded:", json.length || 0, "items");
      data = Array.isArray(json) ? json : []; 
      apply(); 
    })
    .catch(err=>{
      console.error("❌ Failed to load news:", err);
      wrap.innerHTML = '<div style="opacity:.6;text-align:center;padding:40px;color:#fff">خطا در بارگذاری اخبار</div>'; 
    });
})();
