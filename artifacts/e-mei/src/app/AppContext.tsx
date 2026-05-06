import React from "react";

export type TipoLancamento = "receita" | "despesa";

export interface Lancamento {
  id: string;
  tipo: TipoLancamento;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
}

export interface Categoria {
  id: string;
  nome: string;
  tipo: TipoLancamento;
}

export interface AppState {
  userName: string;
  cnpj: string;
  nomeNegocio: string;
  ramo: string;
  dasVencimento: number;
  lancamentos: Lancamento[];
  categorias: Categoria[];
  metaMensal: number;
  showNovoLancamento: boolean;
  novoLancamentoTipo: TipoLancamento;
  currentPage: string;
  setupStep: number;
}

interface AppContextType extends AppState {
  setCurrentPage: (page: string) => void;
  addLancamento: (l: Omit<Lancamento, "id">) => void;
  deleteLancamento: (id: string) => void;
  addCategoria: (c: Omit<Categoria, "id">) => void;
  deleteCategoria: (id: string) => void;
  editCategoria: (id: string, nome: string) => void;
  setShowNovoLancamento: (show: boolean, tipo?: TipoLancamento) => void;
  setMetaMensal: (v: number) => void;
  setSetupStep: (s: number) => void;
  setUserName: (n: string) => void;
  setCnpj: (v: string) => void;
  setNomeNegocio: (v: string) => void;
  setRamo: (v: string) => void;
  setDasVencimento: (v: number) => void;
}

const defaultCategorias: Categoria[] = [
  { id: "r1", nome: "Serviços", tipo: "receita" },
  { id: "r2", nome: "Vendas", tipo: "receita" },
  { id: "r3", nome: "Outros", tipo: "receita" },
  { id: "d1", nome: "Alimentação", tipo: "despesa" },
  { id: "d2", nome: "Transporte", tipo: "despesa" },
  { id: "d3", nome: "Ferramentas", tipo: "despesa" },
  { id: "d4", nome: "Material", tipo: "despesa" },
  { id: "d5", nome: "Outros", tipo: "despesa" },
];

export const AppContext = React.createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>({
    userName: "Joaquim",
    cnpj: "",
    nomeNegocio: "",
    ramo: "",
    dasVencimento: 20,
    lancamentos: [],
    categorias: defaultCategorias,
    metaMensal: 0,
    showNovoLancamento: false,
    novoLancamentoTipo: "receita",
    currentPage: "dashboard",
    setupStep: 1,
  });

  function setCurrentPage(page: string) {
    setState((s) => ({ ...s, currentPage: page }));
  }

  function addLancamento(l: Omit<Lancamento, "id">) {
    const id = Math.random().toString(36).slice(2);
    setState((s) => ({
      ...s,
      lancamentos: [{ ...l, id }, ...s.lancamentos],
      setupStep: Math.max(s.setupStep, s.cnpj ? 3 : 2),
      showNovoLancamento: false,
    }));
  }

  function deleteLancamento(id: string) {
    setState((s) => ({ ...s, lancamentos: s.lancamentos.filter((l) => l.id !== id) }));
  }

  function addCategoria(c: Omit<Categoria, "id">) {
    const id = Math.random().toString(36).slice(2);
    setState((s) => ({ ...s, categorias: [...s.categorias, { ...c, id }] }));
  }

  function deleteCategoria(id: string) {
    setState((s) => ({ ...s, categorias: s.categorias.filter((c) => c.id !== id) }));
  }

  function editCategoria(id: string, nome: string) {
    setState((s) => ({
      ...s,
      categorias: s.categorias.map((c) => (c.id === id ? { ...c, nome } : c)),
    }));
  }

  function setShowNovoLancamento(show: boolean, tipo: TipoLancamento = "receita") {
    setState((s) => ({ ...s, showNovoLancamento: show, novoLancamentoTipo: tipo }));
  }

  function setMetaMensal(v: number) {
    setState((s) => ({ ...s, metaMensal: v }));
  }

  function setSetupStep(step: number) {
    setState((s) => ({ ...s, setupStep: step }));
  }

  function setUserName(n: string) { setState((s) => ({ ...s, userName: n })); }
  function setCnpj(v: string) { setState((s) => ({ ...s, cnpj: v, setupStep: Math.max(s.setupStep, 2) })); }
  function setNomeNegocio(v: string) { setState((s) => ({ ...s, nomeNegocio: v })); }
  function setRamo(v: string) { setState((s) => ({ ...s, ramo: v })); }
  function setDasVencimento(v: number) { setState((s) => ({ ...s, dasVencimento: v })); }

  return (
    <AppContext.Provider value={{
      ...state,
      setCurrentPage, addLancamento, deleteLancamento,
      addCategoria, deleteCategoria, editCategoria,
      setShowNovoLancamento, setMetaMensal, setSetupStep,
      setUserName, setCnpj, setNomeNegocio, setRamo, setDasVencimento,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return React.useContext(AppContext);
}

export function fmt(v: number) {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

export function currentMonth() {
  return new Date().toLocaleString("pt-BR", { month: "long", year: "numeric" });
}
