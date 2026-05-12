import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Leaf, TrendingUp, RefreshCcw } from 'lucide-react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      
      const baseUrl = import.meta.env.VITE_API_URL || 'https://agro-data-engine.onrender.com';
      const response = await fetch(`${baseUrl}/api/Commodities`);
      
      if (!response.ok) throw new Error("Erro na API");
      const json = await response.json();
      
      if (json && json.length > 0) {
        const grouped = json.reduce((acc, item) => {
          const time = new Date(item.timestamp).toLocaleTimeString();
          if (!acc[time]) acc[time] = { time };
          acc[time][item.symbol] = item.price;
          return acc;
        }, {});

        setData(Object.values(grouped).reverse());
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!isMounted) return;
      await fetchData();
      setTimeout(loadData, 10000); 
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a2e1a] via-[#0a0a0a] to-[#0a0a0a] p-4 md:p-8 text-gray-100 font-sans">
      
      {}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12 border-b border-[#2D5A27]/20 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#2D5A27]/10 rounded-lg border border-[#2D5A27]/30 shadow-[0_0_15px_rgba(45,90,39,0.2)]">
            <Leaf className="text-[#2D5A27] w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-widest uppercase">
              Agro<span className="text-[#2D5A27] drop-shadow-[0_0_8px_rgba(45,90,39,0.5)]">Data</span>
            </h1>
            <p className="text-[10px] text-gray-500 tracking-[0.3em] font-mono uppercase">Neural Market Engine v2.0</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
            <p className="text-[10px] text-gray-500 font-mono uppercase">System Status</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs font-bold text-agro-green">OPERATIONAL</span>
              <span className="w-2 h-2 bg-[#2D5A27] rounded-full animate-ping"></span>
            </div>
          </div>
        </div>
      </header>

      {}
      <main className="max-w-7xl mx-auto">
        <div className="bg-[#141414]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          
          {}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D5A27]/5 blur-3xl -z-10"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-xl font-medium flex items-center gap-3">
                <TrendingUp className="text-[#2D5A27]" /> 
                Análise de Commodities <span className="text-xs text-gray-500 font-mono">[LIVE_FEED]</span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">Comparativo de mercado em tempo real: Soja vs Milho</p>
            </div>
            
            <button 
              onClick={fetchData} 
              className="flex items-center gap-2 bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 border border-[#2D5A27]/30 px-4 py-2 rounded-full transition-all active:scale-95 group"
            >
              <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-xs font-bold font-mono">RELOAD_DATA</span>
            </button>
          </div>

          {}
          <div className="h-[450px] w-full bg-black/40 rounded-xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <filter id="shadow" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="0" dy="4" result="offsetblur" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="0.5" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#444"
                  fontSize={10}
                  tickMargin={10}
                  fontFamily="JetBrains Mono, monospace"
                />
                <YAxis 
                  stroke="#444" 
                  fontSize={10} 
                  tickFormatter={(val) => `R$ ${val}`}
                  fontFamily="JetBrains Mono, monospace"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid #2D5A27',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ fontFamily: 'monospace' }}
                />
                <Legend verticalAlign="top" height={36}/>
                <Line 
                  name="SOJA" 
                  type="monotone" 
                  dataKey="SOJA" 
                  stroke="#2D5A27" 
                  strokeWidth={4} 
                  dot={{ r: 0 }} 
                  activeDot={{ r: 6, fill: '#2D5A27', strokeWidth: 0 }}
                  filter="url(#shadow)"
                />
                <Line 
                  name="MILHO" 
                  type="monotone" 
                  dataKey="MILHO" 
                  stroke="#EAB308" 
                  strokeWidth={4} 
                  dot={{ r: 0 }} 
                  activeDot={{ r: 6, fill: '#EAB308', strokeWidth: 0 }}
                  filter="url(#shadow)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {}
      <footer className="max-w-7xl mx-auto mt-12 text-center text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em]">
        Developed by Everton L. de Souza 
      </footer>
    </div>
  );
}

export default App;