import React from "react";
import { Search, TrendingUp, TrendingDown, Trash2, Plus } from "lucide-react";
import { useApp, fmt } from "../AppContext";

export default function Lancamentos() {
  const { lancamentos, categorias, deleteLancamento, setShowNovoLancamento } = useApp();
  const [search, setSearch] = React.useState("");
  const [tab, setTab] = React.useState<"todos" | "receitas" | "despesas">("todos");
  const [categoria, setCategoria] = React.useState("");
  const [periodo, setPeriodo] = React.useState("todos");

  const now = new Date();
  const filtered = lancamentos.filter((l) => {
    const matchTab = tab === "todos" || (tab === "receitas" && l.tipo === "receita") || (tab === "despesas" && l.tipo === "despesa");
    const matchSearch = !search || l.descricao.toLowerCase().includes(search.toLowerCase()) || l.categoria.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoria || l.categoria === categoria;
    let matchPeriodo = true;
    if (periodo !== "todos") {
      const d = new Date(l.data);
      const m = parseInt(periodo);
      matchPeriodo = d.getMonth() === m && d.getFullYear() === now.getFullYear();
    }
    return matchTab && matchSearch && matchCat && matchPeriodo;
  });

  const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Lançamentos</h1>
          <p className="text-sm text-gray-400 mt-0.5">Receitas e despesas registradas</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border border-gray-200 text-gray-600 font-medium text-sm px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            🔄 Recorrentes
          </button>
          <button
            onClick={() => setShowNovoLancamento(true)}
            className="flex items-center gap-2 bg-[#7cce20] text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#6db81c] transition-colors"
          >
            <Plus size={16} /> Novo lançamento
          </button>
        </div>
      </div>

      <div className={`${card} p-5`}>
        {/* Search */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 mb-4">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por descrição ou categoria..."
            className="flex-1 h-10 text-sm text-gray-800 outline-none placeholder:text-gray-400 bg-transparent"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-600 focus:outline-none focus:border-[#7cce20] bg-white min-w-[150px]"
          >
            <option value="">Categoria</option>
            {categorias.map((c) => <option key={c.id} value={c.nome}>{c.nome}</option>)}
          </select>

          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="h-9 border border-gray-200 rounded-lg px-3 text-sm text-gray-600 focus:outline-none focus:border-[#7cce20] bg-white min-w-[140px]"
          >
            <option value="todos">Qualquer período</option>
            {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(["todos", "receitas", "despesas"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                tab === t ? "bg-[#111] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t === "todos" ? "Todos" : t === "receitas" ? "+ Receitas" : "+ Despesas"}
            </button>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-base font-semibold text-gray-700 mb-1">
              {lancamentos.length === 0 ? "Nenhum lançamento encontrado" : "Nenhum resultado para este filtro"}
            </p>
            <p className="text-sm text-gray-400 mb-5">
              {lancamentos.length === 0
                ? <>Adicione seu primeiro lançamento clicando em <strong>+ Novo</strong> acima</>
                : "Tente outro filtro ou período"}
            </p>
            {lancamentos.length === 0 && (
              <button
                onClick={() => setShowNovoLancamento(true)}
                className="bg-[#7cce20] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#6db81c] transition-colors"
              >
                + Novo lançamento
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((l) => (
              <div key={l.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${l.tipo === "receita" ? "bg-green-100" : "bg-red-100"}`}>
                    {l.tipo === "receita"
                      ? <TrendingUp size={16} className="text-green-600" />
                      : <TrendingDown size={16} className="text-red-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{l.descricao}</p>
                    <p className="text-xs text-gray-400">{l.categoria} · {new Date(l.data + "T12:00:00").toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className={`text-sm font-semibold ${l.tipo === "receita" ? "text-green-600" : "text-red-500"}`}>
                    {l.tipo === "receita" ? "+" : "−"}R$ {fmt(l.valor)}
                  </p>
                  <button
                    onClick={() => deleteLancamento(l.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
