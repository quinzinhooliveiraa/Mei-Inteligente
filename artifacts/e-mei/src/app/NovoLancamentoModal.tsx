import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useApp } from "./AppContext";

export default function NovoLancamentoModal() {
  const { showNovoLancamento, novoLancamentoTipo, categorias, setShowNovoLancamento, addLancamento } = useApp();

  const [tipo, setTipo] = React.useState<"receita" | "despesa">(novoLancamentoTipo);
  const [descricao, setDescricao] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [data, setData] = React.useState(new Date().toISOString().slice(0, 10));
  const [categoria, setCategoria] = React.useState("");

  React.useEffect(() => {
    setTipo(novoLancamentoTipo);
    setCategoria("");
  }, [novoLancamentoTipo, showNovoLancamento]);

  const cats = categorias.filter((c) => c.tipo === tipo);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!descricao || !valor || !data) return;
    addLancamento({
      tipo,
      descricao,
      valor: parseFloat(valor.replace(",", ".")),
      data,
      categoria: categoria || cats[0]?.nome || "Outros",
    });
    setDescricao("");
    setValor("");
    setData(new Date().toISOString().slice(0, 10));
    setCategoria("");
  }

  return (
    <AnimatePresence>
      {showNovoLancamento && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNovoLancamento(false)}
            className="fixed inset-0 bg-black/40 z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900">Novo lançamento</h2>
              <button onClick={() => setShowNovoLancamento(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Tipo toggle */}
            <div className="flex rounded-xl bg-gray-100 p-1 mb-5">
              {(["receita", "despesa"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    tipo === t
                      ? t === "receita"
                        ? "bg-[#7cce20] text-white shadow-sm"
                        : "bg-red-500 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t === "receita" ? "+ Receita" : "− Despesa"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Descrição</label>
                <input
                  required
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Ex: Serviço de design"
                  className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm text-gray-800 focus:outline-none focus:border-[#7cce20] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Valor (R$)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="0,00"
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm text-gray-800 focus:outline-none focus:border-[#7cce20] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Data</label>
                  <input
                    required
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm text-gray-800 focus:outline-none focus:border-[#7cce20] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Categoria</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm text-gray-800 focus:outline-none focus:border-[#7cce20] transition-colors bg-white"
                >
                  {cats.map((c) => (
                    <option key={c.id} value={c.nome}>{c.nome}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowNovoLancamento(false)}
                  className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 rounded-xl bg-[#7cce20] text-white text-sm font-semibold hover:bg-[#6db81c] transition-colors shadow-sm"
                >
                  Salvar
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
