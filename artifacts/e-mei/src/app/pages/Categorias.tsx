import React from "react";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { useApp } from "../AppContext";

export default function Categorias() {
  const { categorias, addCategoria, deleteCategoria, editCategoria } = useApp();
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState("");
  const [newReceita, setNewReceita] = React.useState(false);
  const [newDespesa, setNewDespesa] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newNameDespesa, setNewNameDespesa] = React.useState("");

  const receitas = categorias.filter((c) => c.tipo === "receita");
  const despesas = categorias.filter((c) => c.tipo === "despesa");

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm p-5";

  function startEdit(id: string, nome: string) {
    setEditingId(id);
    setEditValue(nome);
  }

  function saveEdit() {
    if (editingId && editValue.trim()) editCategoria(editingId, editValue.trim());
    setEditingId(null);
  }

  function addNew(tipo: "receita" | "despesa") {
    const name = tipo === "receita" ? newName : newNameDespesa;
    if (!name.trim()) return;
    addCategoria({ nome: name.trim(), tipo });
    if (tipo === "receita") { setNewName(""); setNewReceita(false); }
    else { setNewNameDespesa(""); setNewDespesa(false); }
  }

  function CatList({ items, tipo }: { items: typeof categorias; tipo: "receita" | "despesa" }) {
    const isReceita = tipo === "receita";
    const color = isReceita ? "#7cce20" : "#f87171";
    return (
      <div className={card}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
            <span>{isReceita ? "📋" : "🏷️"}</span>
            Categorias de {isReceita ? "Receita" : "Despesa"}
          </h3>
        </div>
        <div className="space-y-1">
          {items.map((c) => (
            <div key={c.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-gray-50 group">
              {editingId === c.id ? (
                <div className="flex items-center gap-2 flex-1 mr-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#7cce20]"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm text-gray-700">{c.nome}</span>
                </div>
              )}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {editingId === c.id ? (
                  <>
                    <button onClick={saveEdit} className="w-7 h-7 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors"><Check size={14} /></button>
                    <button onClick={() => setEditingId(null)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"><X size={14} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(c.id, c.nome)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"><Pencil size={13} /></button>
                    <button onClick={() => deleteCategoria(c.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* New category inline */}
          {(isReceita ? newReceita : newDespesa) && (
            <div className="flex items-center gap-2 py-2 px-3">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <input
                autoFocus
                value={isReceita ? newName : newNameDespesa}
                onChange={(e) => isReceita ? setNewName(e.target.value) : setNewNameDespesa(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNew(tipo)}
                placeholder="Nome da categoria..."
                className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-[#7cce20]"
              />
              <button onClick={() => addNew(tipo)} className="w-7 h-7 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-50"><Check size={14} /></button>
              <button onClick={() => isReceita ? setNewReceita(false) : setNewDespesa(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100"><X size={14} /></button>
            </div>
          )}

          <button
            onClick={() => isReceita ? setNewReceita(true) : setNewDespesa(true)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 py-2 px-3 transition-colors w-full"
          >
            <Plus size={13} /> Nova categoria
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">🏷️ Categorias</h1>
        </div>
        <button
          onClick={() => { setNewReceita(true); setNewDespesa(true); }}
          className="flex items-center gap-2 bg-[#7cce20] text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-[#6db81c] transition-colors"
        >
          <Plus size={16} /> Nova categoria
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <CatList items={receitas} tipo="receita" />
        <CatList items={despesas} tipo="despesa" />
      </div>
    </div>
  );
}
