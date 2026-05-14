import React from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowRight, Search } from "lucide-react";

const ARTICLES = [
  {
    id: 1,
    slug: "o-que-e-das-mei",
    title: "O que é o DAS e quando você precisa pagar?",
    excerpt: "O DAS (Documento de Arrecadação do Simples Nacional) é a guia mensal obrigatória do MEI. Entenda os valores, os prazos e o que acontece se atrasar.",
    category: "DAS & Impostos",
    readTime: "4 min",
    date: "10 Mai 2026",
    featured: true,
  },
  {
    id: 2,
    slug: "limite-faturamento-mei-2025",
    title: "Limite de faturamento do MEI em 2025: o que mudou?",
    excerpt: "O teto do MEI chegou a R$ 130.500 por ano. Saiba como acompanhar seu faturamento e evitar ser excluído da categoria.",
    category: "Faturamento",
    readTime: "5 min",
    date: "05 Mai 2026",
    featured: true,
  },
  {
    id: 3,
    slug: "dasn-declaracao-anual-mei",
    title: "DASN: tudo sobre a declaração anual do MEI",
    excerpt: "A Declaração Anual do MEI precisa ser entregue até 31 de maio. Veja o passo a passo, multas por atraso e como regularizar sua situação.",
    category: "Declaração",
    readTime: "6 min",
    date: "28 Abr 2026",
    featured: false,
  },
  {
    id: 4,
    slug: "nota-fiscal-mei",
    title: "MEI pode emitir nota fiscal? Quando é obrigatório?",
    excerpt: "Muitos MEIs não sabem quando devem emitir nota. Entenda as regras, quais atividades exigem NF e como emitir de forma simples.",
    category: "Nota Fiscal",
    readTime: "5 min",
    date: "20 Abr 2026",
    featured: false,
  },
  {
    id: 5,
    slug: "cnpj-irregular-mei",
    title: "CNPJ irregular: como saber e como regularizar seu MEI?",
    excerpt: "DAS em atraso, declaração não enviada ou dados desatualizados podem deixar seu CNPJ irregular. Veja como verificar e resolver cada situação.",
    category: "Regularização",
    readTime: "7 min",
    date: "15 Abr 2026",
    featured: false,
  },
  {
    id: 6,
    slug: "controle-financeiro-mei",
    title: "Como fazer controle financeiro sendo MEI?",
    excerpt: "Sem controle financeiro, fica impossível saber se você está lucrando. Aprenda métodos simples para organizar entradas, saídas e lucro do seu negócio.",
    category: "Finanças",
    readTime: "8 min",
    date: "08 Abr 2026",
    featured: false,
  },
  {
    id: 7,
    slug: "mei-pode-ter-funcionario",
    title: "MEI pode ter funcionário? Entenda as regras",
    excerpt: "Sim, o MEI pode contratar até 1 funcionário. Mas existem regras específicas sobre salário mínimo, encargos e obrigações trabalhistas.",
    category: "Gestão",
    readTime: "5 min",
    date: "01 Abr 2026",
    featured: false,
  },
  {
    id: 8,
    slug: "beneficios-previdencia-mei",
    title: "Quais benefícios do INSS o MEI tem direito?",
    excerpt: "Pagando o DAS em dia, o MEI tem acesso a aposentadoria, auxílio-doença, salário-maternidade e mais. Saiba o que você já está garantindo.",
    category: "Benefícios",
    readTime: "6 min",
    date: "25 Mar 2026",
    featured: false,
  },
];

const CATEGORIES = ["Todos", "DAS & Impostos", "Faturamento", "Declaração", "Nota Fiscal", "Regularização", "Finanças", "Gestão", "Benefícios"];

const CATEGORY_COLORS: Record<string, string> = {
  "DAS & Impostos": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Faturamento": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Declaração": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Nota Fiscal": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Regularização": "bg-red-500/10 text-red-400 border-red-500/20",
  "Finanças": "bg-green-500/10 text-green-400 border-green-500/20",
  "Gestão": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Benefícios": "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function BlogPage() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("Todos");

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeCategory === "Todos" || a.category === activeCategory;
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = ARTICLES.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <img src="/logo.png" alt="EasyMei" className="h-8 w-auto" />
          </button>
          <span className="text-sm text-muted-foreground">Blog do MEI</span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border/30">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Conhecimento gratuito para MEIs
            </div>
            <h1 className="text-3xl md:text-6xl font-light tracking-wide mb-4">
              Blog do <span className="text-primary">MEI</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Artigos práticos sobre DAS, declaração, nota fiscal, finanças e tudo que você precisa saber para manter seu MEI em dia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destaques */}
      <section className="py-12 border-b border-border/30">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Destaques</p>
          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-3xl border border-border/50 bg-card p-8 hover:border-primary/30 transition-all cursor-pointer flex flex-col justify-between min-h-[200px]"
                onClick={() => {}}
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[article.category]}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{article.excerpt}</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                  <span className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Ler artigo <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtros + Busca */}
      <section className="py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-2 rounded-full border transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de artigos */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              Nenhum artigo encontrado para "{search}".
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group rounded-2xl border border-border/50 bg-card p-6 hover:border-primary/30 transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => {}}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[article.category]}`}>
                        <Tag size={10} className="inline mr-1" />
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={11} /> {article.readTime}</span>
                      <span>{article.date}</span>
                    </div>
                    <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border/30">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-muted-foreground mb-2 text-sm">Quer que a gente cuide do seu MEI?</p>
          <h2 className="text-2xl md:text-4xl font-light mb-6">
            Deixa o trabalho <span className="text-primary">com a gente.</span>
          </h2>
          <button
            onClick={() => { setLocation("/"); setTimeout(() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" }), 100); }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Agendar diagnóstico gratuito <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
