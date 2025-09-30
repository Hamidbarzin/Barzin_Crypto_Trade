
import { useEffect, useMemo, useState } from "react";

const mockTop20 = [
  { 
    symbol: "BTC", name: "Bitcoin", price: 112000, change: +12.8, mcap: "2.2T",
    support: 108500, resistance: 115000, recommendation: "خرید قوی", signal: "STRONG_BUY", 
    rsi: 78, volume24h: "45.6B", nextTarget: 125000, stopLoss: 105000
  },
  { 
    symbol: "ETH", name: "Ethereum", price: 2567, change: +1.8, mcap: "308B",
    support: 2480, resistance: 2650, recommendation: "خرید", signal: "BUY", 
    rsi: 61, volume24h: "14.2B", nextTarget: 2750, stopLoss: 2420
  },
  { 
    symbol: "SOL", name: "Solana", price: 138.7, change: -0.9, mcap: "63B",
    support: 132, resistance: 145, recommendation: "نگهداری", signal: "HOLD", 
    rsi: 47, volume24h: "2.1B", nextTarget: 155, stopLoss: 128
  },
  { 
    symbol: "XRP", name: "XRP", price: 0.62, change: +0.5, mcap: "35B",
    support: 0.58, resistance: 0.68, recommendation: "خرید", signal: "BUY", 
    rsi: 61, volume24h: "1.8B", nextTarget: 0.72, stopLoss: 0.55
  },
  { 
    symbol: "ADA", name: "Cardano", price: 0.45, change: -1.2, mcap: "16B",
    support: 0.42, resistance: 0.49, recommendation: "فروش ضعیف", signal: "WEAK_SELL", 
    rsi: 45, volume24h: "680M", nextTarget: 0.38, stopLoss: 0.47
  },
  { 
    symbol: "AVAX", name: "Avalanche", price: 37.8, change: +2.1, mcap: "15B",
    support: 35.2, resistance: 42.1, recommendation: "خرید", signal: "BUY", 
    rsi: 59, volume24h: "590M", nextTarget: 45, stopLoss: 34
  },
  { 
    symbol: "DOT", name: "Polkadot", price: 6.2, change: -0.8, mcap: "8B",
    support: 5.8, resistance: 6.8, recommendation: "نگهداری", signal: "HOLD", 
    rsi: 48, volume24h: "320M", nextTarget: 7.2, stopLoss: 5.5
  },
  { 
    symbol: "MATIC", name: "Polygon", price: 0.87, change: +1.4, mcap: "8B",
    support: 0.82, resistance: 0.94, recommendation: "خرید", signal: "BUY", 
    rsi: 62, volume24h: "410M", nextTarget: 1.05, stopLoss: 0.79
  },
  { 
    symbol: "UNI", name: "Uniswap", price: 8.9, change: +0.7, mcap: "6.7B",
    support: 8.2, resistance: 9.8, recommendation: "نگهداری", signal: "HOLD", 
    rsi: 54, volume24h: "280M", nextTarget: 10.5, stopLoss: 7.9
  },
  { 
    symbol: "LTC", name: "Litecoin", price: 73.5, change: -0.3, mcap: "5.4B",
    support: 70, resistance: 78, recommendation: "نگهداری", signal: "HOLD", 
    rsi: 49, volume24h: "850M", nextTarget: 82, stopLoss: 68
  },
  { 
    symbol: "LINK", name: "Chainlink", price: 14.2, change: +1.8, mcap: "8.3B",
    support: 13.1, resistance: 15.8, recommendation: "خرید", signal: "BUY", 
    rsi: 63, volume24h: "520M", nextTarget: 17.2, stopLoss: 12.5
  },
  { 
    symbol: "ATOM", name: "Cosmos", price: 9.8, change: +2.3, mcap: "3.8B",
    support: 9.1, resistance: 10.9, recommendation: "خرید قوی", signal: "STRONG_BUY", 
    rsi: 68, volume24h: "180M", nextTarget: 12.5, stopLoss: 8.7
  },
];

const mockOrderBook = {
  bids: [
    { p: 64210, q: 0.12 },
    { p: 64205, q: 0.40 },
    { p: 64190, q: 0.80 },
    { p: 64185, q: 0.15 },
    { p: 64180, q: 0.25 },
  ],
  asks: [
    { p: 64270, q: 0.10 },
    { p: 64285, q: 0.25 },
    { p: 64300, q: 0.55 },
    { p: 64315, q: 0.18 },
    { p: 64330, q: 0.35 },
  ],
};

const mockTrades = [
  { side: "buy", p: 64232, q: 0.02, t: "12:03:12" },
  { side: "sell", p: 64218, q: 0.06, t: "12:03:07" },
  { side: "buy", p: 64240, q: 0.03, t: "12:02:59" },
  { side: "sell", p: 64205, q: 0.04, t: "12:02:45" },
  { side: "buy", p: 64225, q: 0.07, t: "12:02:30" },
];

export default function Market() {
  const [symbol, setSymbol] = useState("BTC");
  const [side, setSide] = useState("BUY"); // BUY | SELL
  const [otype, setOtype] = useState("MARKET"); // MARKET | LIMIT
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [dbDown, setDbDown] = useState(false);
  const [showAddCrypto, setShowAddCrypto] = useState(false);
  const [cryptoList, setCryptoList] = useState(mockTop20);
  const [realTimePrices, setRealTimePrices] = useState({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);

  // Fetch real-time prices from CoinGecko directly
  const fetchRealTimePrices = async () => {
    setIsLoadingPrices(true);
    console.log('Fetching real-time prices from CoinGecko...');
    try {
      // Use CoinGecko API with pro API key for higher rate limits
      const coinIds = ['bitcoin', 'ethereum', 'solana', 'ripple', 'cardano', 'avalanche-2', 'polkadot', 'polygon', 'uniswap', 'litecoin', 'chainlink', 'cosmos'];
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`;
      
      const response = await fetch(url, {
        headers: {
          'x-cg-demo-api-key': '881ba5a9f027338c265eff2d481b899ab62cd76a28f343537c5589299527a0de'
        }
      });
      console.log('CoinGecko API Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Received real price data:', data);
        
        // Map CoinGecko data to our format
        const mappedData = {};
        const symbolMap = {
          'bitcoin': 'BTC',
          'ethereum': 'ETH', 
          'solana': 'SOL',
          'ripple': 'XRP',
          'cardano': 'ADA',
          'avalanche-2': 'AVAX',
          'polkadot': 'DOT',
          'polygon': 'MATIC',
          'uniswap': 'UNI',
          'litecoin': 'LTC',
          'chainlink': 'LINK',
          'cosmos': 'ATOM'
        };
        
        Object.entries(data).forEach(([coinId, coinData]) => {
          const symbol = symbolMap[coinId];
          if (symbol && coinData.usd) {
            mappedData[symbol] = {
              price: coinData.usd,
              change_24h: coinData.usd_24h_change || 0,
              market_cap: coinData.usd_market_cap || 0,
              volume_24h: coinData.usd_24h_vol || 0
            };
          }
        });
        
        setRealTimePrices(mappedData);
        
        // Update crypto list with real prices
        setCryptoList(currentList => 
          currentList.map(crypto => {
            const realData = mappedData[crypto.symbol];
            if (realData) {
              console.log(`✅ Updating ${crypto.symbol}: $${realData.price.toFixed(2)} (${realData.change_24h > 0 ? '+' : ''}${realData.change_24h.toFixed(2)}%)`);
              return {
                ...crypto,
                price: parseFloat(realData.price.toFixed(realData.price < 1 ? 6 : 2)),
                change: parseFloat(realData.change_24h.toFixed(2)),
                volume24h: formatVolume(realData.volume_24h),
                mcap: formatMarketCap(realData.market_cap),
                lastUpdated: new Date().toISOString()
              };
            }
            return crypto;
          })
        );
        setDbDown(false);
      } else {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to fetch real-time prices:', error);
      setDbDown(true);
      // Fallback to mock data with realistic prices
      console.log('🔄 Using fallback prices...');
    } finally {
      setIsLoadingPrices(false);
    }
  };

  // شبیه‌سازی خطای دیتابیس: اگر اندپوینت خاموش بود این فلگ را true کن
  useEffect(() => {
    // Fetch prices immediately and then every 10 seconds for real-time updates
    fetchRealTimePrices();
    const interval = setInterval(fetchRealTimePrices, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // قیمت مرجع انتخاب‌شده
  const refPrice = useMemo(() => {
    const row = cryptoList.find((r) => r.symbol === symbol);
    return row ? row.price : 0;
  }, [symbol, cryptoList]);

  useEffect(() => {
    if (otype === "MARKET") setPrice(refPrice.toString());
  }, [otype, refPrice]);

  const total = useMemo(() => {
    const p = Number(price || 0);
    const q = Number(amount || 0);
    if (!p || !q) return 0;
    const gross = p * q;
    const fee = gross * 0.001; // 0.1% fee (قابل‌تنظیم)
    return +(gross + (side === "BUY" ? fee : 0)).toFixed(2);
  }, [price, amount, side]);

  const placeOrder = () => {
    const p = Number(price), q = Number(amount);
    if (otype === "LIMIT" && (!p || p <= 0)) return alert("Enter a valid limit price.");
    if (!q || q <= 0) return alert("Enter a valid amount.");

    const payload = {
      symbol, side, type: otype, price: otype === "MARKET" ? null : p, amount: q,
    };

    // TODO: ارسال به بک‌اند خودت: POST /api/orders
    // fetch('/api/orders', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})

    alert(`Order queued:\n${JSON.stringify(payload, null, 2)}`);
    setAmount("");
    if (otype === "LIMIT") setPrice("");
  };

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
      <div className="relative z-10 min-h-screen bg-neutral-950/60 text-neutral-100">
      {/* بنر خطای دیتابیس/اندپوینت */}
      {dbDown && (
        <div className="bg-red-600/20 border-b border-red-800 text-red-100 px-4 py-2 text-sm">
          Database/API endpoint is unreachable. Displaying cached/mock data.
        </div>
      )}

      <header className="px-6 py-5 border-b border-neutral-800">
        <h1 className="text-2xl font-semibold">Markets & Trading</h1>
        <p className="text-neutral-400 text-sm">Real-time prices, order entry, order book, and analysis.</p>
      </header>

      <main className="px-6 py-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* ----- LEFT: TOP 20 + MARKETS (IDs to fix missing DOM) ----- */}
        <section className="xl:col-span-1 space-y-6">
          <div id="crypto-top20" className="bg-neutral-900/60 rounded-2xl border border-neutral-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Live Crypto Prices</h2>
                {isLoadingPrices && (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                )}
                {Object.keys(realTimePrices).length > 0 && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                )}
              </div>
              <input
                placeholder="Search..."
                className="bg-neutral-800/70 text-sm rounded-md px-2 py-1 outline-none"
                onChange={(e) => {
                  const v = e.target.value.toUpperCase();
                  const found = cryptoList.find(r => r.symbol.includes(v) || r.name.toUpperCase().includes(v));
                  if (found) setSymbol(found.symbol);
                }}
              />
            </div>
            <ul className="divide-y divide-neutral-800 max-h-[420px] overflow-auto">
              {cryptoList.map((c) => (
                <li
                  key={c.symbol}
                  onClick={() => setSymbol(c.symbol)}
                  className={`px-4 py-4 cursor-pointer hover:bg-neutral-800/50 ${symbol===c.symbol ? "bg-neutral-800/60" : ""} border-b border-neutral-800/50`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 grid place-items-center text-xs font-bold">{c.symbol[0]}</div>
                      <div>
                        <div className="text-sm font-medium">{c.name} <span className="text-neutral-400">({c.symbol})</span></div>
                        <div className="text-xs text-neutral-500">MCap {c.mcap} • Vol {c.volume24h}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold flex items-center gap-1">
                        ${formatPrice(c.price)}
                        {realTimePrices[c.symbol] && (
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" title="Live Price"></div>
                        )}
                      </div>
                      <div className={c.change>=0 ? "text-emerald-400 text-xs" : "text-rose-400 text-xs"}>
                        {c.change>=0 ? "▲" : "▼"} {Math.abs(c.change).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Support:</span>
                        <span className="text-emerald-400 font-mono">${c.support.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Target:</span>
                        <span className="text-blue-400 font-mono">${c.nextTarget.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Resistance:</span>
                        <span className="text-rose-400 font-mono">${c.resistance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Stop Loss:</span>
                        <span className="text-orange-400 font-mono">${c.stopLoss.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/50">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-500">RSI:</span>
                      <span className={`text-xs font-bold ${c.rsi > 70 ? 'text-red-400' : c.rsi < 30 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {c.rsi}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSignalColor(c.signal)}`}>
                      {c.recommendation}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="markets" className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Markets</h2>
              <span className="text-xs text-neutral-400">Symbol: <b>{symbol}</b></span>
            </div>
            <div className="text-sm text-neutral-300">
              <p>Reference Price: <b>${refPrice.toLocaleString()}</b></p>
              <p className="text-neutral-500 text-xs mt-1">Hook this card to your live price feed later.</p>
            </div>
          </div>
        </section>

        {/* ----- CENTER: Chart / Analysis ----- */}
        <section className="xl:col-span-2 space-y-6">
          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">{symbol}/USDT Chart</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowAddCrypto(true)}
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1"
                >
                  <span>+</span> Add Crypto
                </button>
                <span className="text-xs text-neutral-500">Real-time Chart</span>
              </div>
            </div>
            <div className="h-[360px] rounded-xl bg-neutral-800/40 relative overflow-hidden">
              <SimpleChart symbol={symbol} data={generateChartData()} />
            </div>
          </div>

          {/* Tabs: Technical / Fundamentals */}
          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800">
            <div className="px-4 pt-3 flex gap-2 border-b border-neutral-800">
              <Tab label="Technical" active />
              <Tab label="Fundamentals" />
            </div>
            <div className="p-4 grid sm:grid-cols-3 gap-4 text-sm">
              <Metric label="RSI (14)" value="52.4" hint="Neutral" />
              <Metric label="50D MA" value="$62,120" />
              <Metric label="200D MA" value="$56,980" />
              <Metric label="24h Volume" value="18.2B" />
              <Metric label="Circulating Supply" value="19.7M" />
              <Metric label="ATH / ATL" value="$73,7k / $65" />
            </div>
          </div>
        </section>

        {/* ----- RIGHT: Trading Panel + OB/Trades ----- */}
        <section className="xl:col-span-1 space-y-6">
          {/* Order Entry */}
          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium">Place Order</h2>
              <div className="bg-neutral-800 rounded-md p-1 flex">
                {["BUY","SELL"].map(s => (
                  <button
                    key={s}
                    onClick={()=>setSide(s)}
                    className={`px-3 py-1 text-xs rounded ${side===s ? (s==="BUY" ? "bg-emerald-600 text-white":"bg-rose-600 text-white") : "text-neutral-300"}`}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 text-xs mb-3">
              {["MARKET","LIMIT"].map(t=>(
                <button key={t}
                  onClick={()=>setOtype(t)}
                  className={`px-3 py-1 rounded border ${otype===t ? "border-neutral-600 bg-neutral-800" : "border-neutral-800 bg-neutral-900 text-neutral-400"}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Field
                label="Price (USDT)"
                value={price}
                onChange={setPrice}
                disabled={otype==="MARKET"}
                placeholder={otype==="MARKET" ? refPrice.toString() : "e.g. 64000"}
              />
              <Field label="Amount (BTC)" value={amount} onChange={setAmount} placeholder="0.01" />
              <div className="text-sm text-neutral-400 flex items-center justify-between">
                <span>Fee (est.) 0.10%</span>
                <span>Total: <b className="text-neutral-100">${total.toLocaleString()}</b></span>
              </div>
              <button
                onClick={placeOrder}
                className={`w-full py-2 rounded-xl font-medium ${side==="BUY" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-rose-600 hover:bg-rose-500"}`}>
                {side==="BUY" ? "Buy" : "Sell"} {symbol}
              </button>
            </div>
          </div>

          {/* Order Book */}
          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <h2 className="font-medium">Order Book</h2>
              <span className="text-xs text-neutral-500">Best bid/ask</span>
            </div>
            <div className="grid grid-cols-2 text-xs">
              <div className="p-3 space-y-2 border-r border-neutral-800">
                <div className="text-neutral-400 mb-1">Bids</div>
                {mockOrderBook.bids.map((r,i)=>(
                  <Row key={i} p={r.p} q={r.q} side="bid" />
                ))}
              </div>
              <div className="p-3 space-y-2">
                <div className="text-neutral-400 mb-1">Asks</div>
                {mockOrderBook.asks.map((r,i)=>(
                  <Row key={i} p={r.p} q={r.q} side="ask" />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-800">
              <h2 className="font-medium">Recent Trades</h2>
            </div>
            <ul className="max-h-56 overflow-auto divide-y divide-neutral-800 text-xs">
              {mockTrades.map((t,i)=>(
                <li key={i} className="px-4 py-2 flex items-center justify-between">
                  <span className={t.side==="buy"?"text-emerald-400":"text-rose-400"}>{t.side.toUpperCase()}</span>
                  <span>${t.p}</span>
                  <span>{t.q} {symbol}</span>
                  <span className="text-neutral-500">{t.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* Add Crypto Modal */}
      {showAddCrypto && (
        <AddCryptoModal 
          onClose={() => setShowAddCrypto(false)} 
          onAdd={(newCrypto) => {
            setCryptoList([...cryptoList, newCrypto]);
            setShowAddCrypto(false);
          }}
        />
      )}
      </div>
    </div>
  );
}

function Field({label, value, onChange, placeholder, disabled=false}) {
  return (
    <label className="block">
      <span className="text-xs text-neutral-400">{label}</span>
      <input
        type="number"
        step="any"
        disabled={disabled}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full mt-1 px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg text-sm ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />
    </label>
  );
}

function Tab({label, active}) {
  return (
    <button className={`px-3 py-2 text-sm rounded-t-lg ${active ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"}`}>
      {label}
    </button>
  );
}

function Metric({label, value, hint}) {
  return (
    <div>
      <div className="text-neutral-400 text-xs">{label}</div>
      <div className="font-semibold">{value}</div>
      {hint && <div className="text-xs text-neutral-500">{hint}</div>}
    </div>
  );
}

function Row({p, q, side}) {
  return (
    <div className="flex justify-between text-xs">
      <span className={side==="bid" ? "text-emerald-400" : "text-rose-400"}>${p}</span>
      <span className="text-neutral-400">{q}</span>
    </div>
  );
}

function getSignalColor(signal) {
  switch(signal) {
    case "STRONG_BUY": return "bg-green-600 text-white";
    case "BUY": return "bg-green-500 text-white";
    case "HOLD": return "bg-yellow-600 text-white";
    case "WEAK_SELL": return "bg-orange-500 text-white";
    case "SELL": return "bg-red-500 text-white";
    case "STRONG_SELL": return "bg-red-600 text-white";
    default: return "bg-neutral-600 text-white";
  }
}

function formatPrice(price) {
  if (!price) return "$0.00";
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 100) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatVolume(volume) {
  if (!volume) return "N/A";
  if (volume >= 1e12) return `${(volume / 1e12).toFixed(1)}T`;
  if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
  if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
  return volume.toFixed(0);
}

function formatMarketCap(mcap) {
  if (!mcap) return "N/A";
  if (mcap >= 1e12) return `${(mcap / 1e12).toFixed(2)}T`;
  if (mcap >= 1e9) return `${(mcap / 1e9).toFixed(1)}B`;
  if (mcap >= 1e6) return `${(mcap / 1e6).toFixed(1)}M`;
  return mcap.toFixed(0);
}

function generateChartData() {
  const data = [];
  let price = 64000;
  for (let i = 0; i < 50; i++) {
    price += (Math.random() - 0.5) * 1000;
    data.push({
      time: i,
      price: Math.max(price, 1000),
      volume: Math.random() * 1000000
    });
  }
  return data;
}

function SimpleChart({ symbol, data }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center text-neutral-400 text-sm mb-4 pt-4">
        {symbol}/USDT Price Chart
      </div>
      
      {/* Simple Price Line */}
      <div className="flex-1 relative">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          {/* Grid Lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line 
              key={i} 
              x1="0" 
              y1={i * 40} 
              x2="400" 
              y2={i * 40} 
              stroke="#374151" 
              strokeWidth="0.5"
            />
          ))}
          
          {/* Price Path */}
          <path
            d={`M 0,${100 + Math.sin(0) * 30} ${data.slice(0, 40).map((_, i) => 
              `L ${i * 10},${100 + Math.sin(i * 0.3) * 30 + (Math.random() - 0.5) * 20}`
            ).join(' ')}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          
          {/* Area Fill */}
          <path
            d={`M 0,200 L 0,${100 + Math.sin(0) * 30} ${data.slice(0, 40).map((_, i) => 
              `L ${i * 10},${100 + Math.sin(i * 0.3) * 30 + (Math.random() - 0.5) * 20}`
            ).join(' ')} L 390,200 Z`}
            fill="url(#priceGradient)"
          />
        </svg>
        
        {/* Price Labels */}
        <div className="absolute bottom-2 left-2 text-xs text-neutral-400">
          24h Low: $62,180
        </div>
        <div className="absolute top-2 right-2 text-xs text-neutral-400">
          24h High: $67,420
        </div>
      </div>
    </div>
  );
}

function AddCryptoModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    price: "",
    change: "",
    mcap: "",
    support: "",
    resistance: "",
    recommendation: "نگهداری",
    signal: "HOLD",
    rsi: "50",
    volume24h: "",
    nextTarget: "",
    stopLoss: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.symbol || !formData.name || !formData.price) {
      alert("لطفاً فیلدهای ضروری را پر کنید");
      return;
    }

    const newCrypto = {
      symbol: formData.symbol.toUpperCase(),
      name: formData.name,
      price: parseFloat(formData.price),
      change: parseFloat(formData.change || 0),
      mcap: formData.mcap || "N/A",
      support: parseFloat(formData.support || formData.price * 0.95),
      resistance: parseFloat(formData.resistance || formData.price * 1.05),
      recommendation: formData.recommendation,
      signal: formData.signal,
      rsi: parseInt(formData.rsi),
      volume24h: formData.volume24h || "N/A",
      nextTarget: parseFloat(formData.nextTarget || formData.price * 1.1),
      stopLoss: parseFloat(formData.stopLoss || formData.price * 0.9)
    };

    onAdd(newCrypto);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">اضافه کردن ارز جدید</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xl">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">نماد ارز *</label>
              <input
                type="text"
                placeholder="مثال: DOGE"
                value={formData.symbol}
                onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">نام ارز *</label>
              <input
                type="text"
                placeholder="مثال: Dogecoin"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">قیمت فعلی ($) *</label>
              <input
                type="number"
                step="any"
                placeholder="مثال: 0.08"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">تغییر 24 ساعته (%)</label>
              <input
                type="number"
                step="any"
                placeholder="مثال: 2.5"
                value={formData.change}
                onChange={(e) => setFormData({...formData, change: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">حمایت ($)</label>
              <input
                type="number"
                step="any"
                placeholder="سطح حمایت"
                value={formData.support}
                onChange={(e) => setFormData({...formData, support: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">مقاومت ($)</label>
              <input
                type="number"
                step="any"
                placeholder="سطح مقاومت"
                value={formData.resistance}
                onChange={(e) => setFormData({...formData, resistance: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">پیشنهاد</label>
              <select
                value={formData.recommendation}
                onChange={(e) => setFormData({...formData, recommendation: e.target.value, signal: e.target.selectedOptions[0].dataset.signal})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
              >
                <option value="خرید قوی" data-signal="STRONG_BUY">خرید قوی</option>
                <option value="خرید" data-signal="BUY">خرید</option>
                <option value="نگهداری" data-signal="HOLD">نگهداری</option>
                <option value="فروش ضعیف" data-signal="WEAK_SELL">فروش ضعیف</option>
                <option value="فروش" data-signal="SELL">فروش</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">RSI</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="50"
                value={formData.rsi}
                onChange={(e) => setFormData({...formData, rsi: e.target.value})}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-neutral-700 hover:bg-neutral-600 py-3 rounded-xl font-medium transition-all"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-medium transition-all"
            >
              اضافه کردن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
