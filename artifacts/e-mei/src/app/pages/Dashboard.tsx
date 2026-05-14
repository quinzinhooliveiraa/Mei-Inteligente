import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  X,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useApp, fmt } from "../AppContext";

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const LIMIT = 81000;
const DAS_VALUE = 86.05;

function getLimiteColor(pct: number) {
  if (pct >= 90) return "#ef4444";
  if (pct >= 80) return "#f97316";
  if (pct >= 60) return "#eab308";
  return "#7cce20";
}

export default function Dashboard() {
  const { userName, lancamentos, cnpj, setupStep, setCurrentPage, setShowNovoLancamento, setSetupStep } = useApp();
  const [showSetup, setShowSetup] = React.useState(true);

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const monthLancamentos = lancamentos.filter((l) => {
    const d = new Date(l.data);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });

  const receitas = monthLancamentos.filter((l) => l.tipo === "receita").reduce((s, l) => s + l.valor, 0);
  const despesas = monthLancamentos.filter((l) => l.tipo === "despesa").reduce((s, l) => s + l.valor, 0);

  const anoLancamentos = lancamentos.filter((l) => new Date(l.data).getFullYear() === thisYear);
  const faturadoAno = anoLancamentos.filter((l) => l.tipo === "receita").reduce((s, l) => s + l.valor, 0);
  const limitePct = Math.min((faturadoAno / LIMIT) * 100, 100);
  const limiteColor = getLimiteColor(limitePct);

  const hasDasRisk = DAS_VALUE > 0;
  const hasReceitas = receitas > 0;
  const saudeStatus = !hasReceitas && hasDasRisk ? "crítico" : !hasReceitas ? "atenção" : "boa";

  // Chart data: last 5 months
  const chartData = Array.from({ length: 5 }, (_, i) => {
    const m = (thisMonth - 4 + i + 12) % 12;
    const y = thisMonth - 4 + i < 0 ? thisYear - 1 : thisYear;
    const ml = lancamentos.filter((l) => {
      const d = new Date(l.data);
      return d.getMonth() === m && d.getFullYear() === y;
    });
    return {
      mes: MONTHS[m],
      receitas: ml.filter((l) => l.tipo === "receita").reduce((s, l) => s + l.valor, 0),
      despesas: ml.filter((l) => l.tipo === "despesa").reduce((s, l) => s + l.valor, 0),
    };
  });

  // Category breakdown for expenses
  const catMap: Record<string, number> = {};
  monthLancamentos.filter((l) => l.tipo === "despesa").forEach((l) => {
    catMap[l.categoria] = (catMap[l.categoria] || 0) + l.valor;
  });
  const catData = Object.entries(catMap).map(([name, value]) => ({ name, value }));
  const PIE_COLORS = ["#7cce20", "#22d3ee", "#f97316", "#a78bfa", "#fb923c"];

  const setupSteps = [
    { label: "Conta criada", done: true, action: null },
    { label: "Informe seu CNPJ e ramo de atividade", sub: "Necessário para calcular seu DAS corretamente", done: !!cnpj, action: () => setCurrentPage("config"), actionLabel: "Preencher agora →" },
    { label: "Adicione seu primeiro lançamento", sub: "Registre uma receita ou despesa para começar", done: lancamentos.length > 0, action: () => setShowNovoLancamento(true), actionLabel: "+ Novo lançamento" },
  ];

  const completedSteps = setupSteps.filter((s) => s.done).length;

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Olá, {userName}! 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">Resumo do seu MEI</p>
        </div>
        <button
          onClick={() => setShowNovoLancamento(true)}
          className="flex items-center gap-2 bg-[#7cce20] text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#6db81c] transition-colors shadow-sm"
        >
          <Plus size={16} />
          Novo lançamento
        </button>
      </div>

      {/* Setup checklist */}
      {showSetup && completedSteps < setupSteps.length && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-white font-medium text-sm">Dashboard — primeiros passos</span>
              <div className="flex-1 w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7cce20] rounded-full transition-all duration-700"
                  style={{ width: `${(completedSteps / setupSteps.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{completedSteps} de {setupSteps.length} feito</span>
              <button onClick={() => setShowSetup(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {setupSteps.map((step, i) => (
              <div key={i} className={`flex items-start gap-4 px-5 py-4 ${step.done ? "opacity-60" : ""}`}>
                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-[#7cce20]" : "bg-white/10 border border-white/20 text-white/60 text-xs font-bold"}`}>
                  {step.done ? <CheckCircle2 size={14} className="text-white" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${step.done ? "line-through text-gray-400" : "text-white"}`}>{step.label}</p>
                  {!step.done && step.sub && <p className="text-xs text-gray-500 mt-0.5">{step.sub}</p>}
                  {!step.done && step.action && (
                    <button
                      onClick={step.action}
                      className="mt-2 text-xs bg-[#7cce20] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#6db81c] transition-colors"
                    >
                      {step.actionLabel}
                    </button>
                  )}
                </div>
                {step.done && <span className="text-xs text-gray-500 shrink-0">feito</span>}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Trial banner */}
      <div className="flex items-center gap-3 bg-[#111] rounded-xl px-4 py-3">
        <span className="text-xs font-bold bg-[#7cce20] text-white px-2 py-0.5 rounded-full">+ 7 dias</span>
        <p className="text-sm text-gray-300 flex-1">
          Você está no <strong className="text-white">período de teste</strong> — aproveite todos os recursos Pro
        </p>
        <button className="text-xs font-semibold bg-amber-400 text-black px-3 py-1.5 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap">
          Fazer upgrade →
        </button>
      </div>

      {/* Limite MEI */}
      <div className={`${card} p-5`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">🎯 Limite anual MEI {thisYear}</h3>
          <span className="text-xs font-medium text-[#7cce20] bg-[#7cce20]/10 px-2 py-0.5 rounded-full">
            {limitePct < 60 ? "Dentro do limite ✓" : limitePct < 80 ? "Atenção" : "Crítico"}
          </span>
        </div>
        <div className="relative mb-3">
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${limitePct}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ backgroundColor: limiteColor }}
            />
          </div>
          {[60, 80].map((p) => (
            <div key={p} className="absolute top-0 h-2.5 w-px bg-gray-300" style={{ left: `${p}%` }} />
          ))}
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>R$ 0</span>
            <span>60%</span>
            <span>80%</span>
            <span>R$ 81.000</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Faturado no ano</p>
            <p className="font-semibold text-gray-800 mt-0.5">R$ {fmt(faturadoAno)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Restante</p>
            <p className="font-semibold text-gray-800 mt-0.5">R$ {fmt(LIMIT - faturadoAno)}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Média/mês</p>
            <p className="font-semibold text-gray-800 mt-0.5">R$ {fmt(LIMIT / 12)}</p>
          </div>
        </div>
      </div>

      {/* 3-col cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* DAS */}
        <div className={`${card} p-5`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Boleto DAS</p>
                <p className="text-[10px] text-gray-400">Contribuição mensal MEI</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Pendente</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <div>
              <p className="text-xl font-bold text-gray-900">14</p>
              <p className="text-[10px] text-gray-400">dias restantes</p>
            </div>
            <div>
              <p className="text-sm font-bold text-amber-600">Dia 20</p>
              <p className="text-[10px] text-gray-400">vencimento</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700">Mai {thisYear}</p>
              <p className="text-[10px] text-gray-400">referência</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage("das")}
            className="w-full py-2 rounded-xl bg-[#7cce20] text-white text-sm font-semibold hover:bg-[#6db81c] transition-colors"
          >
            ⬇ Emitir DAS
          </button>
        </div>

        {/* Saúde financeira */}
        <div className={`${card} p-5`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <CheckCircle size={14} className="text-[#7cce20]" /> Saúde financeira
            </p>
            <p className="text-[10px] text-gray-400">Atualizado agora</p>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${saudeStatus === "boa" ? "border-[#7cce20] text-[#7cce20]" : saudeStatus === "atenção" ? "border-amber-400 text-amber-500" : "border-red-400 text-red-500"}`}>
              {Math.round(limitePct)}
            </div>
            <div>
              <p className={`font-bold text-sm capitalize ${saudeStatus === "boa" ? "text-[#7cce20]" : saudeStatus === "atenção" ? "text-amber-500" : "text-red-500"}`}>
                {saudeStatus === "crítico" ? "Crítico" : saudeStatus === "atenção" ? "Atenção" : "Boa"}
              </p>
              <p className="text-[10px] text-gray-400">
                {saudeStatus === "crítico" ? "Seu negócio precisa de atenção." : saudeStatus === "atenção" ? "Fique de olho nas métricas." : "Tudo certo por aqui!"}
              </p>
            </div>
          </div>
          <div className="space-y-1.5">
            {!hasReceitas && <span className="inline-flex items-center gap-1 text-[10px] bg-orange-50 text-orange-600 border border-orange-200 rounded-full px-2 py-0.5">⚠ Sem receitas este mês</span>}
            {hasDasRisk && <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-500 border border-red-200 rounded-full px-2 py-0.5">⚠ DAS pendente</span>}
            <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-600 border border-green-200 rounded-full px-2 py-0.5">✓ Limite seguro</span>
          </div>
          {(!hasReceitas || hasDasRisk) && (
            <p className="text-[10px] text-gray-500 mt-3 bg-blue-50 rounded-lg p-2">
              💡 Registre receitas e quite o DAS para subir rapidamente de nível.
            </p>
          )}
        </div>

        {/* Meta mensal */}
        <div className={`${card} p-5`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-gray-700">Meta mensal</p>
              <p className="text-[10px] text-gray-400">
                {new Date().toLocaleString("pt-BR", { month: "long", year: "numeric" })}
              </p>
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">PRO</span>
          </div>
          <p className="text-3xl font-bold text-[#7cce20] mb-1">R$ {fmt(receitas)}</p>
          <p className="text-[10px] text-gray-400 mb-3">sem meta definida</p>
          <div className="h-1.5 bg-gray-100 rounded-full" />
          <p className="text-[10px] text-gray-400 mt-2">0% — <button onClick={() => setCurrentPage("metas")} className="text-[#7cce20] underline">Defina sua meta na página de Metas</button></p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Últimos lançamentos */}
        <div className={`${card} p-5`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 text-sm">Últimos lançamentos</h3>
            {lancamentos.length > 0 && (
              <button onClick={() => setCurrentPage("lancamentos")} className="text-xs text-[#7cce20] hover:underline">
                Ver todos →
              </button>
            )}
          </div>
          {lancamentos.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-sm font-medium text-gray-600 mb-1">Nenhum lançamento em {MONTHS[thisMonth]}</p>
              <p className="text-xs text-gray-400 mb-4">Registre sua primeira receita ou despesa do mês</p>
              <button
                onClick={() => setShowNovoLancamento(true)}
                className="text-sm bg-[#7cce20] text-white px-4 py-2 rounded-xl font-semibold hover:bg-[#6db81c] transition-colors"
              >
                + Novo lançamento
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {lancamentos.slice(0, 5).map((l) => (
                <div key={l.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${l.tipo === "receita" ? "bg-green-100" : "bg-red-100"}`}>
                      {l.tipo === "receita" ? <TrendingUp size={14} className="text-green-600" /> : <TrendingDown size={14} className="text-red-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{l.descricao}</p>
                      <p className="text-[10px] text-gray-400">{l.categoria} · {new Date(l.data + "T12:00:00").toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold ${l.tipo === "receita" ? "text-green-600" : "text-red-500"}`}>
                    {l.tipo === "receita" ? "+" : "−"}R$ {fmt(l.valor)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Receitas vs Despesas */}
        <div className={`${card} p-5`}>
          <h3 className="font-semibold text-gray-800 text-sm mb-4">Receitas vs Despesas</h3>
          {lancamentos.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-xs text-gray-400">Adicione seu primeiro lançamento<br />para ver o gráfico aqui</p>
              <div className="flex items-center gap-4 mt-4">
                <span className="flex items-center gap-1 text-[10px] text-gray-400"><span className="w-2 h-2 rounded-full bg-[#7cce20]" />Receitas</span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400"><span className="w-2 h-2 rounded-full bg-red-400" />Despesas</span>
              </div>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={chartData} barGap={2} barCategoryGap="25%">
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
                    formatter={(v: number) => [`R$ ${fmt(v)}`, ""]}
                  />
                  <Bar dataKey="receitas" fill="#7cce20" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="despesas" fill="#f87171" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-[10px] text-gray-500"><span className="w-2 h-2 rounded-full bg-[#7cce20]" />Receitas</span>
                <span className="flex items-center gap-1 text-[10px] text-gray-500"><span className="w-2 h-2 rounded-full bg-red-400" />Despesas</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Despesas por categoria */}
      <div className={`${card} p-5`}>
        <h3 className="font-semibold text-gray-800 text-sm mb-4">Despesas por categoria</h3>
        {catData.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="text-3xl mb-2">🏷️</div>
            <p className="text-xs text-gray-400">Nenhuma despesa ainda.<br />Adicione um lançamento para ver aqui.</p>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <PieChart width={120} height={120}>
              <Pie data={catData} cx={55} cy={55} innerRadius={30} outerRadius={52} paddingAngle={2} dataKey="value">
                {catData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
            </PieChart>
            <div className="space-y-2">
              {catData.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-xs text-gray-600">{c.name}</span>
                  <span className="text-xs font-semibold text-gray-800 ml-auto">R$ {fmt(c.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
