import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Wallet,
  LineChart,
  BellRing,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: (
      <div className="relative w-36 h-44 flex items-end justify-center">
        <div className="absolute bottom-0 w-24 h-40 bg-[#1a1a1a] rounded-[20px] border-2 border-white/10 shadow-2xl flex flex-col items-center justify-center gap-2 overflow-hidden">
          <div className="w-16 h-1.5 bg-white/10 rounded-full mb-2" />
          <div className="w-12 h-2 bg-white/8 rounded" />
          <div className="w-12 h-2 bg-white/6 rounded mt-1" />
          <div className="w-12 h-2 bg-white/5 rounded mt-1" />
        </div>
        <div className="absolute top-0 left-2 w-11 h-11 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl shadow-lg">
          💰
        </div>
        <div className="absolute top-3 right-1 w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl shadow-lg">
          💵
        </div>
      </div>
    ),
    title: "Registre receitas e despesas",
    desc: "Adicione seus ganhos e gastos em segundos, tudo organizado por categoria e data.",
  },
  {
    icon: (
      <div className="relative w-36 h-44 flex items-end justify-center">
        <div className="absolute bottom-0 w-24 h-40 bg-[#1a1a1a] rounded-[20px] border-2 border-white/10 shadow-2xl flex items-end justify-center pb-4 gap-1.5 overflow-hidden">
          <div className="w-5 h-10 bg-primary/60 rounded-t-md" />
          <div className="w-5 h-16 bg-primary rounded-t-md" />
          <div className="w-5 h-8 bg-rose-400/80 rounded-t-md" />
          <div className="w-5 h-12 bg-primary/70 rounded-t-md" />
        </div>
      </div>
    ),
    title: "Acompanhe o faturamento",
    desc: "Gráficos claros de receitas vs despesas mês a mês. Saiba para onde vai seu dinheiro.",
  },
  {
    icon: (
      <div className="relative w-36 h-44 flex items-end justify-center">
        <div className="absolute bottom-0 w-24 h-40 bg-[#1a1a1a] rounded-[20px] border-2 border-white/10 shadow-2xl flex flex-col items-center justify-center gap-2 p-3 overflow-hidden">
          <div className="w-full h-6 bg-amber-400/20 border border-amber-400/40 rounded-lg flex items-center px-2 gap-1.5">
            <span className="text-[8px] text-amber-400 font-bold">60%</span>
            <div className="flex-1 h-1 bg-amber-400/30 rounded-full overflow-hidden">
              <div className="w-3/5 h-full bg-amber-400 rounded-full" />
            </div>
          </div>
          <div className="w-full h-6 bg-orange-400/20 border border-orange-400/40 rounded-lg flex items-center px-2 gap-1.5">
            <span className="text-[8px] text-orange-400 font-bold">80%</span>
            <div className="flex-1 h-1 bg-orange-400/30 rounded-full overflow-hidden">
              <div className="w-4/5 h-full bg-orange-400 rounded-full" />
            </div>
          </div>
        </div>
        <div className="absolute -top-1 right-2 w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-xl shadow-lg">
          🔔
        </div>
      </div>
    ),
    title: "Alertas do limite MEI",
    desc: "Quando atingir 60%, 80% ou 90% dos R$ 81.000, te avisamos para se planejar.",
  },
  {
    icon: (
      <div className="flex items-center justify-center w-28 h-28">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <ShieldCheck size={52} className="text-primary drop-shadow-[0_0_12px_rgba(124,206,32,0.5)]" />
          </div>
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping" style={{ animationDuration: "2s" }} />
        </div>
      </div>
    ),
    title: "Dados seguros e relatórios",
    desc: "Tudo salvo com segurança. Gere relatórios mensais prontos para seu contador com um clique.",
  },
];

function MockDashboard() {
  return (
    <div className="absolute inset-0 flex overflow-hidden select-none pointer-events-none" aria-hidden>
      {/* Sidebar */}
      <div className="w-44 shrink-0 bg-[#111] border-r border-white/5 flex flex-col gap-1 p-3">
        <div className="flex items-center gap-2 px-2 py-3 mb-2">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center text-xs font-bold text-black">E</div>
          <span className="text-sm font-medium">EasyMei</span>
        </div>
        {[
          { icon: LayoutDashboard, label: "Dashboard", active: true },
          { icon: Wallet, label: "Finanças" },
          { icon: FileText, label: "Notas Fiscais" },
          { icon: Users, label: "Clientes" },
          { icon: BellRing, label: "Alertas" },
          { icon: Settings, label: "Configurações" },
        ].map(({ icon: Icon, label, active }) => (
          <div key={label} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs ${active ? "bg-primary/20 text-primary" : "text-white/40"}`}>
            <Icon size={14} />
            {label}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col bg-background overflow-hidden">
        {/* Topbar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
          <div className="w-40 h-4 bg-white/10 rounded" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30" />
            <div className="w-24 h-8 bg-primary rounded-lg" />
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="w-48 h-6 bg-white/10 rounded mb-6" />
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { color: "bg-primary/20", accent: "bg-primary" },
              { color: "bg-blue-500/10", accent: "bg-blue-400" },
              { color: "bg-rose-500/10", accent: "bg-rose-400" },
            ].map((c, i) => (
              <div key={i} className={`${c.color} rounded-2xl p-4 border border-white/5`}>
                <div className="w-20 h-3 bg-white/10 rounded mb-3" />
                <div className="w-28 h-7 bg-white/15 rounded mb-2" />
                <div className="flex items-center gap-1">
                  <div className={`w-12 h-2 ${c.accent} rounded`} />
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/4 rounded-2xl p-4 border border-white/5 h-28" />
            <div className="bg-white/4 rounded-2xl p-4 border border-white/5 h-28" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  function next() {
    if (step < steps.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      setLocation("/app");
    }
  }

  function skip() {
    setLocation("/");
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <MockDashboard />

      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 pt-7 pb-2">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === step ? 28 : 8,
                  backgroundColor: i === step ? "var(--primary)" : i < step ? "rgba(124,206,32,0.4)" : "rgba(255,255,255,0.15)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="h-2 rounded-full"
              />
            ))}
          </div>

          {/* Step content */}
          <div className="px-8 pt-6 pb-8 min-h-[320px] flex flex-col items-center">
            <div className="flex items-center justify-center h-48 mb-6">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                >
                  {current.icon}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`text-${step}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <h2 className="text-lg font-semibold tracking-tight mb-2">{current.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{current.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-8 pb-8">
            <button
              onClick={skip}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              Pular
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={next}
              className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-2.5 rounded-xl shadow-[0_0_16px_rgba(124,206,32,0.3)] hover:bg-primary/90 transition-colors"
            >
              {isLast ? "Começar! 🚀" : <>Próximo <ArrowRight size={15} /></>}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
