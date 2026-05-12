import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Leaf, RefreshCcw, TrendingUp, TrendingDown } from 'lucide-react';

function TickerCard({ symbol, value, color, pulse }) {
  return (
    <div
      className="flex flex-col gap-1 px-6 py-3 border-l border-white/5 min-w-[140px]"
      style={{ borderTopColor: color, borderTopWidth: 2 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{symbol} / BRL</span>
        {pulse && (
          <span
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
      <span className="text-xl font-black font-mono" style={{ color }}>
        {value ?? <span className="text-gray-600 text-sm">—</span>}
      </span>
      <span className="text-[9px] text-gray-600 font-mono">R$ / saca</span>
    </div>
  );
}

function LastUpdate({ time }) {
  return (
    <div className="flex flex-col gap-1 px-6 py-3 border-l border-white/5 min-w-[120px]">
      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">Atualizado</span>
      <span className="text-sm font-mono text-gray-400">{time ?? '—'}</span>
      <span className="text-[9px] text-gray-600 font-mono">LIVE · 10s</span>
    </div>
  );
}

function StatusBadge({ error }) {
  return (
    <div className="hidden md:flex flex-col items-end gap-1 pl-6 border-l border-white/5">
      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">System</span>
      <div className="flex items-center gap-2">
        {error ? (
          <span className="text-[11px] font-bold font-mono text-red-400">DEGRADED</span>
        ) : (
          <>
            <span className="text-[11px] font-bold font-mono text-[#2D5A27]">OPERATIONAL</span>
            <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-ping" />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pulse, setPulse] = useState(false);

  const fetchData = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://agro-data-engine.onrender.com';
      const res = await fetch(`${baseUrl}/api/Commodities`);
      if (!res.ok) throw new Error('Erro na API');
      const json = await res.json();

      if (json?.length > 0) {
        const grouped = json.reduce((acc, item) => {
          const time = new Date(item.timestamp).toLocaleTimeString('pt-BR');
          if (!acc[time]) acc[time] = { time };
          acc[time][item.symbol] = item.price;
          return acc;
        }, {});
        setData(Object.values(grouped).reverse());
        setError(false);
        setPulse(true);
        setTimeout(() => setPulse(false), 2000);
      }
      setLoading(false);
    } catch (err) {
      console.error('[AgroData] fetchData:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const last = data[data.length - 1];
  const lastSoja = last?.SOJA != null ? `R$ ${Number(last.SOJA).toFixed(2)}` : null;
  const lastMilho = last?.MILHO != null ? `R$ ${Number(last.MILHO).toFixed(2)}` : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#2D5A27] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">
            Conectando ao feed de mercado...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans flex flex-col">

      {/* Header com tickers integrados */}
      <header className="border-b border-white/5 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-stretch gap-0 flex-wrap">

          {/* Logo */}
          <div className="flex items-center gap-3 pr-8 mr-2">
            <div className="p-2 bg-[#2D5A27]/10 rounded-lg border border-[#2D5A27]/20">
              <Leaf className="text-[#2D5A27] w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-widest uppercase leading-none">
                Agro<span className="text-[#2D5A27]">Data</span>
              </h1>
              <p className="text-[8px] text-gray-600 tracking-[0.25em] font-mono uppercase mt-0.5">
                Market Engine v2.0
              </p>
            </div>
          </div>

          {/* Tickers */}
          <TickerCard symbol="SOJA" value={lastSoja} color="#2D5A27" pulse={pulse} />
          <TickerCard symbol="MILHO" value={lastMilho} color="#EAB308" pulse={pulse} />
          <LastUpdate time={last?.time} />

          {/* Status empurrado pra direita */}
          <div className="ml-auto flex items-center">
            <StatusBadge error={error} />
          </div>
        </div>
      </header>

      {/* Toolbar do gráfico */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2D5A27]" />
            Análise de Commodities
            <span className="text-[10px] text-gray-600 font-mono">[LIVE_FEED]</span>
          </h2>
          <p className="text-xs text-gray-600 mt-0.5 font-mono">
            Comparativo em tempo real · Soja vs Milho
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-all active:scale-95 group"
        >
          <RefreshCcw className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-[10px] font-mono text-gray-400 uppercase">Reload</span>
        </button>
      </div>

      {/* Gráfico */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pb-8">
        <div className="h-[500px] w-full bg-[#0d0d0d] rounded-2xl border border-white/5 p-4">
          {data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-700 font-mono text-xs">
              {error ? 'Erro ao carregar dados.' : 'Aguardando dados do feed...'}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <filter id="glow-green">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="glow-yellow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#333"
                  fontSize={9}
                  tickMargin={10}
                  fontFamily="JetBrains Mono, monospace"
                  tick={{ fill: '#555' }}
                />
                <YAxis
                  stroke="#333"
                  fontSize={9}
                  tickFormatter={(val) => `${val}`}
                  fontFamily="JetBrains Mono, monospace"
                  tick={{ fill: '#555' }}
                  width={45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d0d0d',
                    border: '1px solid #2D5A27',
                    borderRadius: '8px',
                    fontSize: 11,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                  labelStyle={{ color: '#666', marginBottom: 4 }}
                  formatter={(val, name) => [`R$ ${Number(val).toFixed(2)}`, name]}
                />
                <Legend
                  verticalAlign="top"
                  height={32}
                  wrapperStyle={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
                />
                <Line
                  name="SOJA"
                  type="monotone"
                  dataKey="SOJA"
                  stroke="#2D5A27"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#2D5A27', strokeWidth: 0 }}
                  filter="url(#glow-green)"
                />
                <Line
                  name="MILHO"
                  type="monotone"
                  dataKey="MILHO"
                  stroke="#EAB308"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#EAB308', strokeWidth: 0 }}
                  filter="url(#glow-yellow)"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </main>

      <footer className="border-t border-white/5 py-4 text-center text-[9px] text-gray-700 font-mono uppercase tracking-widest">
        Developed by Everton L. de Souza
      </footer>
    </div>
  );
}