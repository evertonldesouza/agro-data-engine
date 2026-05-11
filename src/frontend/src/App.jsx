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
    <div className="min-h-screen bg-[#121212] p-8 text-white">
      {}
      <header className="flex justify-between items-center mb-10 border-b border-[#2D5A27]/30 pb-4">
        <div className="flex items-center gap-3">
          <Leaf className="text-[#2D5A27] w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tighter">
            AGRO DATA <span className="text-[#2D5A27]">ENGINE</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          API STATUS: ONLINE
        </div>
      </header>

      {}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#1C1C1C] p-6 rounded-xl border border-gray-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="text-[#2D5A27]" /> Tendência: Soja vs Milho
            </h2>
            <button onClick={fetchData} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <RefreshCcw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C1C1C', border: '1px solid #2D5A27' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                {}
                <Line 
                  name="Soja (R$)" 
                  type="monotone" 
                  dataKey="SOJA" 
                  stroke="#2D5A27" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#2D5A27' }} 
                />
                <Line 
                  name="Milho (R$)" 
                  type="monotone" 
                  dataKey="MILHO" 
                  stroke="#EAB308" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#EAB308' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;