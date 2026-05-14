import React from "react";
import { ExternalLink, HelpCircle } from "lucide-react";

const MONTHS_DAS = [
  { ref: "Maio/2026", vence: "20/05", valor: 86.05, dias: 14, status: "pendente" },
  { ref: "Junho/2026", vence: "20/06", valor: 86.05, dias: 45, status: "pendente" },
  { ref: "Julho/2026", vence: "20/07", valor: 86.05, dias: 75, status: "pendente" },
];

export default function DasPage() {
  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          🗓️ Obrigações MEI
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">Mantenha seu MEI regularizado e evite multas</p>
      </div>

      {/* DAS section */}
      <div className={`${card} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">🗓️</div>
            <div>
              <p className="font-semibold text-gray-800 flex items-center gap-1.5">
                DAS — Documento de Arrecadação do Simples
                <HelpCircle size={14} className="text-gray-400" />
              </p>
              <p className="text-xs text-gray-400">Pago todo mês até o dia 20</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Pendente</span>
        </div>

        <div className="divide-y divide-gray-100">
          {MONTHS_DAS.map((m) => (
            <div key={m.ref} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-8">
                <p className="text-sm font-semibold text-gray-800 w-24">{m.ref}</p>
                <p className="text-sm text-gray-500">Vence {m.vence}</p>
                <p className="text-sm font-semibold text-gray-800">R$ {m.valor.toFixed(2).replace(".", ",")}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.dias <= 14 ? "text-amber-600 bg-amber-50" : "text-gray-500 bg-gray-100"}`}>
                  Em {m.dias} dias
                </span>
                <button className="text-sm text-[#7cce20] font-medium hover:underline flex items-center gap-1">
                  Como pagar <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DASN section */}
      <div className={`${card} p-5`}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">📄</div>
          <div>
            <p className="font-semibold text-gray-800">DASN-SIMEI — Declaração anual</p>
            <p className="text-xs text-gray-400">Exercício 2025 · Vence 31/05/2026</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">PRO</span>
            <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Em 25 dias</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Faturamento 2025</p>
            <p className="text-xl font-bold text-gray-800 mt-1">R$ 0</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Funcionário em 2025</p>
            <p className="text-xl font-bold text-gray-800 mt-1">Não</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Prazo restante</p>
            <p className="text-xl font-bold text-gray-800 mt-1">25 dias</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">Preencha sua DASN com 1 clique</p>
          <p className="text-sm text-gray-400 mb-4">Os dados já estão prontos com base nos seus lançamentos</p>
          <button className="bg-[#7cce20] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#6db81c] transition-colors shadow-sm">
            🔓 Desbloquear grátis
          </button>
        </div>
      </div>
    </div>
  );
}
