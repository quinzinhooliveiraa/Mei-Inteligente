import React from "react";
import { useApp, fmt } from "../AppContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const PIE_COLORS = ["#7cce20","#22d3ee","#f97316","#a78bfa","#fb923c"];

export default function Relatorios() {
  const { lancamentos } = useApp();
  const [periodo, setPeriodo] = React.useState("todos");
  const [year, setYear] = React.useState(new Date().getFullYear());

  const filtered = lancamentos.filter((l) => {
    const d = new Date(l.data);
    if (d.getFullYear() !== year) return false;
    if (periodo !== "todos") return d.getMonth() === parseInt(periodo);
    return true;
  });

  const receitas = filtered.filter((l) => l.tipo === "receita").reduce((s, l) => s + l.valor, 0);
  const despesas = filtered.filter((l) => l.tipo === "despesa").reduce((s, l) => s + l.valor, 0);
  const lucro = receitas - despesas;

  const chartData = Array.from({ length: 12 }, (_, m) => {
    const ml = lancamentos.filter((l) => {
      const d = new Date(l.data);
      return d.getMonth() === m && d.getFullYear() === year;
    });
    return {
      mes: MONTHS[m],
      receitas: ml.filter((l) => l.tipo === "receita").reduce((s, l) => s + l.valor, 0),
      despesas: ml.filter((l) => l.tipo === "despesa").reduce((s, l) => s + l.valor, 0),
    };
  });

  const catMap: Record<string, number> = {};
  filtered.filter((l) => l.tipo === "despesa").forEach((l) => {
    catMap[l.categoria] = (catMap[l.categoria] || 0) + l.valor;
  });
  const catData = Object.entries(catMap).map(([name, value]) => ({ name, value }));

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">📊 Relatórios</h1>
        <button className="flex items-center gap-2 bg-[#111] text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-black transition-colors">
          <span className="text-xs font-bold bg-amber-400 text-black px-1.5 py-0.5 rounded-md mr-1">PRO</span>
          📄 Exportar PDF
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 font-medium">Período:</span>
        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}
          className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-600 focus:outline-none bg-white">
          <option value="todos">Todos</option>
          {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
        </select>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}
          className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-600 focus:outline-none bg-white">
          {[2024, 2025, 2026].map((y) => <option key={y}>{y}</option>)}
        </select>
      </div>

      {/* Summary */}
      <div className={`${card} grid grid-cols-3 divide-x divide-gray-100`}>
        {[
          { label: "RECEITAS", value: receitas, color: "text-[#7cce20]" },
          { label: "DESPESAS", value: despesas, color: "text-red-500" },
          { label: "LUCRO", value: lucro, color: lucro >= 0 ? "text-[#7cce20]" : "text-red-500" },
        ].map((s) => (
          <div key={s.label} className="p-5 text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>R$ {fmt(s.value)}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Bar chart */}
        <div className={`${card} p-5`}>
          <h3 className="font-semibold text-gray-800 text-sm mb-4">Receita vs Despesa</h3>
          {lancamentos.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-xs text-gray-400">Adicione seu primeiro lançamento<br />para ver o gráfico aqui</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} barGap={2} barCategoryGap="25%">
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 11 }} formatter={(v: number) => [`R$ ${fmt(v)}`, ""]} />
                <Bar dataKey="receitas" fill="#7cce20" radius={[3, 3, 0, 0]} />
                <Bar dataKey="despesas" fill="#f87171" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie chart */}
        <div className={`${card} p-5`}>
          <h3 className="font-semibold text-gray-800 text-sm mb-4">Despesas por categoria</h3>
          {catData.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <p className="text-2xl mb-2">🏷️</p>
              <p className="text-xs text-gray-400">Sem dados</p>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <PieChart width={120} height={120}>
                <Pie data={catData} cx={55} cy={55} innerRadius={28} outerRadius={50} paddingAngle={2} dataKey="value">
                  {catData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
              </PieChart>
              <div className="space-y-2">
                {catData.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="text-xs text-gray-600">{c.name}</span>
                    <span className="text-xs font-semibold text-gray-800 ml-auto">R$ {fmt(c.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
