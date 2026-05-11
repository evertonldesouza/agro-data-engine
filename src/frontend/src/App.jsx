import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, TrendingUp, RefreshCcw } from 'lucide-react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5072/api/Commodities');
      if (!response.ok) throw new Error("Erro na API");
      const json = await response.json();
      
      if (json && json.length > 0) {
        setData(json.reverse());
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
    <div className="min-h-screen bg-[#121212] p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b border-agro-green/30 pb-4">
        <div className="flex items-center gap-3">
          <Leaf className="text-agro-green w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tighter">AGRO DATA <span className="text-agro-green">ENGINE</span></h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          API ONLINE (PORT 5072)
        </div>
      </header>

      {/* Grid de Gráficos */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-agro-graphite p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="text-agro-green" /> Tendência de Preços (Soja vs Milho)
            </h2>
            <button onClick={fetchData} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(str) => new Date(str).toLocaleTimeString()} 
                  stroke="#666"
                />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2D5A27' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="price" stroke="#2D5A27" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;