import React from "react";
import { useApp, fmt } from "../AppContext";

export default function Metas() {
  const { lancamentos, metaMensal, setMetaMensal } = useApp();
  const [inputMeta, setInputMeta] = React.useState(metaMensal > 0 ? metaMensal.toString() : "");

  const now = new Date();
  const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const monthReceitas = lancamentos
    .filter((l) => {
      const d = new Date(l.data);
      return l.tipo === "receita" && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((s, l) => s + l.valor, 0);

  const pct = metaMensal > 0 ? Math.min((monthReceitas / metaMensal) * 100, 100) : 0;

  // Last 6 months history
  const history = Array.from({ length: 6 }, (_, i) => {
    const m = (now.getMonth() - 5 + i + 12) % 12;
    const y = now.getMonth() - 5 + i < 0 ? now.getFullYear() - 1 : now.getFullYear();
    const total = lancamentos
      .filter((l) => {
        const d = new Date(l.data);
        return l.tipo === "receita" && d.getMonth() === m && d.getFullYear() === y;
      })
      .reduce((s, l) => s + l.valor, 0);
    return { mes: MONTHS[m].slice(0, 3), total };
  });

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm";
  const hasHistory = history.some((h) => h.total > 0);

  function handleSave() {
    const v = parseFloat(inputMeta.replace(",", "."));
    setMetaMensal(isNaN(v) ? 0 : v);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          🎯 Metas de Faturamento
          <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full ml-1">PRO</span>
        </h1>
        <span className="text-sm text-gray-400">
          {MONTHS[now.getMonth()]}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className={`${card} p-5 md:col-span-2`}>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Faturado este mês</p>
          <p className="text-4xl font-bold text-[#7cce20] mb-1">R$ {fmt(monthReceitas)}</p>
          <p className="text-sm text-gray-400 mb-4">
            {metaMensal > 0 ? `Meta: R$ ${fmt(metaMensal)}` : "Defina uma meta para acompanhar seu progresso"}
          </p>

          <div className="relative mb-2">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7cce20] rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>R$ {fmt(0)}</span>
            <span className="font-medium text-[#7cce20]">{Math.round(pct)}%</span>
            {metaMensal > 0 ? <span>R$ {fmt(metaMensal)}</span> : <span>—</span>}
          </div>
        </div>

        <div className={`${card} p-5`}>
          <h3 className="font-semibold text-gray-800 text-sm mb-4">Histórico</h3>
          {!hasHistory ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-xs text-gray-400">Nenhum histórico ainda</p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((h) => (
                <div key={h.mes} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-8">{h.mes}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7cce20] rounded-full"
                      style={{ width: metaMensal > 0 ? `${Math.min((h.total / metaMensal) * 100, 100)}%` : h.total > 0 ? "50%" : "0%" }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600 w-20 text-right">R$ {fmt(h.total)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meta mensal input */}
      <div className={`${card} p-5`}>
        <h3 className="font-semibold text-gray-800 text-sm mb-1">Meta mensal</h3>
        <p className="text-xs text-gray-400 mb-4">Defina quanto deseja faturar este mês</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 flex-1">
            <span className="text-sm font-medium text-gray-500">R$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={inputMeta}
              onChange={(e) => setInputMeta(e.target.value)}
              placeholder="0,00"
              className="flex-1 h-11 text-sm text-gray-800 focus:outline-none bg-transparent"
            />
          </div>
          <button
            onClick={handleSave}
            className="h-11 px-6 rounded-xl bg-[#7cce20] text-white text-sm font-semibold hover:bg-[#6db81c] transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>

      {/* Teto por categoria */}
      <div className={`${card} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">Teto por categoria</h3>
          </div>
          <button className="text-xs text-[#7cce20] font-medium hover:underline">+ Definir teto</button>
        </div>
        <div className="flex flex-col items-center py-6 text-center">
          <p className="text-xs text-gray-400">
            Nenhum teto definido. Clique em <strong>+ Definir teto</strong> para controlar seus gastos por categoria.
          </p>
        </div>
      </div>
    </div>
  );
}
