import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  Tag,
  FileText,
  BookOpen,
  BarChart2,
  Target,
  Settings,
  Menu,
  X,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { AppProvider, useApp } from "./AppContext";
import NovoLancamentoModal from "./NovoLancamentoModal";
import Dashboard from "./pages/Dashboard";
import Lancamentos from "./pages/Lancamentos";
import Categorias from "./pages/Categorias";
import DasPage from "./pages/DasPage";
import LivroCaixa from "./pages/LivroCaixa";
import Relatorios from "./pages/Relatorios";
import Metas from "./pages/Metas";
import Config from "./pages/Config";

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "lancamentos", icon: Wallet, label: "Lançamentos" },
  { id: "categorias", icon: Tag, label: "Categorias" },
  null, // separator: OBRIGAÇÕES
  { id: "das", icon: FileText, label: "DAS & DASN" },
  { id: "livrocaixa", icon: BookOpen, label: "Livro Caixa", pro: true },
  null, // separator: GESTÃO
  { id: "relatorios", icon: BarChart2, label: "Relatórios" },
  { id: "metas", icon: Target, label: "Metas", pro: true },
  { id: "config", icon: Settings, label: "Configurações" },
];

const SECTION_LABELS: Record<number, string> = { 3: "OBRIGAÇÕES", 6: "GESTÃO" };

function PageContent() {
  const { currentPage } = useApp();
  const pages: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    lancamentos: <Lancamentos />,
    categorias: <Categorias />,
    das: <DasPage />,
    livrocaixa: <LivroCaixa />,
    relatorios: <Relatorios />,
    metas: <Metas />,
    config: <Config />,
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {pages[currentPage] ?? <Dashboard />}
      </motion.div>
    </AnimatePresence>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const { currentPage, setCurrentPage, lancamentos, setShowNovoLancamento } = useApp();

  const monthReceitas = lancamentos
    .filter((l) => {
      const d = new Date(l.data);
      const n = new Date();
      return l.tipo === "receita" && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    })
    .reduce((s, l) => s + l.valor, 0);

  function navigate(id: string) {
    setCurrentPage(id);
    onClose?.();
  }

  return (
    <div className="flex flex-col h-full bg-[#111111] text-white w-full">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7cce20] flex items-center justify-center font-bold text-black text-base">e</div>
            <span className="font-semibold text-base tracking-tight">e-mei</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5 ml-10">MEI INTELIGENTE</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors lg:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto pb-4">
        {NAV_ITEMS.map((item, i) => {
          if (item === null) {
            return (
              <div key={`sep-${i}`} className="mt-4 mb-2 px-2">
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{SECTION_LABELS[i]}</p>
              </div>
            );
          }
          const { id, icon: Icon, label, pro } = item;
          const active = currentPage === id;
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${
                active
                  ? "bg-[#7cce20]/20 text-[#7cce20]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              {label}
              {pro && (
                <span className="ml-auto text-[9px] font-bold bg-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded-md">PRO</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer plan */}
      <div className="p-3 border-t border-white/5">
        <div className="bg-white/5 rounded-xl p-3 mb-2">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7cce20]" />
            <p className="text-xs font-semibold">Pro (Teste)</p>
          </div>
          <p className="text-[10px] text-gray-500 pl-3">7 dias restantes</p>
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#7cce20] rounded-full" style={{ width: "85%" }} />
          </div>
        </div>
        <button
          onClick={() => setShowNovoLancamento(true)}
          className="w-full flex items-center justify-center gap-2 bg-amber-400 text-black text-xs font-bold py-2.5 rounded-xl hover:bg-amber-300 transition-colors"
        >
          Upgrade Pro 🚀
        </button>
      </div>
    </div>
  );
}

function AppShell() {
  const { setShowNovoLancamento, lancamentos } = useApp();
  const [mobileSidebar, setMobileSidebar] = React.useState(false);

  return (
    <div className="flex h-screen bg-[#f5f4ef] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-44 shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebar(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed left-0 top-0 bottom-0 w-52 z-50 lg:hidden"
            >
              <Sidebar onClose={() => setMobileSidebar(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/5">
          <button onClick={() => setMobileSidebar(true)} className="text-white">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#7cce20] flex items-center justify-center font-bold text-black text-sm">e</div>
            <span className="text-white font-semibold text-sm">e-mei</span>
          </div>
          <button
            onClick={() => setShowNovoLancamento(true)}
            className="w-8 h-8 rounded-xl bg-[#7cce20] flex items-center justify-center"
          >
            <Plus size={16} className="text-black" />
          </button>
        </div>

        {/* Page scroll area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-5 py-6">
            <PageContent />
          </div>
        </main>
      </div>

      {/* FAB on mobile */}
      <button
        onClick={() => setShowNovoLancamento(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#7cce20] rounded-full shadow-lg flex items-center justify-center lg:hidden z-30 hover:bg-[#6db81c] transition-colors"
      >
        <Plus size={24} className="text-black" />
      </button>

      <NovoLancamentoModal />
    </div>
  );
}

export default function AppLayout() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
