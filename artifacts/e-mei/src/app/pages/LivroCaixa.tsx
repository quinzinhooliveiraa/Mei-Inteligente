import React from "react";
import { useApp, fmt } from "../AppContext";

const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

export default function LivroCaixa() {
  const { lancamentos } = useApp();
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = React.useState(now.getMonth());
  const [selectedYear, setSelectedYear] = React.useState(now.getFullYear());

  const months = [
    (selectedMonth - 2 + 12) % 12,
    (selectedMonth - 1 + 12) % 12,
    selectedMonth,
  ];

  const monthLancamentos = lancamentos.filter((l) => {
    const d = new Date(l.data);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm";

  let runningBalance = 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            🗒️ Livro Caixa
            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full ml-1">PRO</span>
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">Gerado automaticamente pelos seus lançamentos</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-600 focus:outline-none focus:border-[#7cce20] bg-white"
          >
            {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-600 focus:outline-none focus:border-[#7cce20] bg-white"
          >
            {[2024, 2025, 2026].map((y) => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Month tabs */}
      <div className="grid grid-cols-3 gap-3">
        {months.map((m, i) => {
          const isActive = m === selectedMonth;
          const ml = lancamentos.filter((l) => {
            const d = new Date(l.data);
            return d.getMonth() === m && d.getFullYear() === selectedYear;
          });
          const total = ml.filter((l) => l.tipo === "receita").reduce((s, l) => s + l.valor, 0);
          return (
            <button
              key={i}
              onClick={() => setSelectedMonth(m)}
              className={`${card} p-4 text-left transition-all hover:shadow-md ${isActive ? "ring-2 ring-[#7cce20] bg-[#7cce20]/5" : ""}`}
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{MONTHS[m].slice(0, 3).toUpperCase()}</p>
              <p className={`text-xl font-bold mt-1 ${isActive ? "text-[#7cce20]" : "text-gray-800"}`}>R$ {fmt(total)}</p>
              <p className="text-xs text-gray-400 mt-0.5">{ml.length} lançamento{ml.length !== 1 ? "s" : ""}</p>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className={card}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-base">🗒️</span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Registros do período</p>
              <p className="text-xs text-gray-400">{MONTHS[selectedMonth]} {selectedYear} · {monthLancamentos.length} lançamentos</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">{monthLancamentos.length === 0 ? "Sem lançamentos" : `${monthLancamentos.length} registros`}</span>
        </div>

        {monthLancamentos.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="text-3xl mb-2">🗒️</div>
            <p className="text-sm font-medium text-gray-600 mb-1">Nenhum lançamento neste período</p>
            <p className="text-xs text-gray-400">Adicione lançamentos para ver o livro caixa</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6 px-5 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <span>Data</span>
              <span className="col-span-2">Descrição</span>
              <span>Categoria</span>
              <span className="text-right">Entradas</span>
              <span className="text-right">Saídas</span>
            </div>
            {monthLancamentos
              .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
              .map((l) => {
                if (l.tipo === "receita") runningBalance += l.valor;
                else runningBalance -= l.valor;
                return (
                  <div key={l.id} className="grid grid-cols-6 px-5 py-3 text-sm border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <span className="text-gray-500">{new Date(l.data + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</span>
                    <span className="col-span-2 text-gray-800 font-medium">{l.descricao}</span>
                    <span className="text-gray-500">{l.categoria}</span>
                    <span className="text-right text-green-600 font-medium">{l.tipo === "receita" ? `R$ ${fmt(l.valor)}` : ""}</span>
                    <span className="text-right text-red-500 font-medium">{l.tipo === "despesa" ? `R$ ${fmt(l.valor)}` : ""}</span>
                  </div>
                );
              })}
          </>
        )}

        <div className="p-5 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Exportar livro caixa</p>
              <p className="text-xs text-gray-400">PDF formatado e Excel prontos para o contador</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-medium border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-white transition-colors">
                📊 Exportar CSV
              </button>
              <button className="text-xs font-semibold bg-[#7cce20] text-white px-4 py-1.5 rounded-lg hover:bg-[#6db81c] transition-colors flex items-center gap-1.5">
                🔓 Desbloquear grátis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
