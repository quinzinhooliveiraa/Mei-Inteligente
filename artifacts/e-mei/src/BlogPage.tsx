import React from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowRight, Search } from "lucide-react";
import { ARTICLES, CATEGORY_COLORS } from "./articles-data";
import { useSEO } from "./hooks/useSEO";

const CATEGORIES = ["Todos", "DAS & Impostos", "Faturamento", "Declaração", "Nota Fiscal", "Regularização", "Finanças", "Gestão", "Benefícios"];

export default function BlogPage() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("Todos");

  useSEO({
    title: "Blog do MEI — Artigos sobre DAS, DASN, Nota Fiscal e Finanças",
    description: "Aprenda tudo sobre MEI: DAS, declaração anual (DASN), nota fiscal, limite de faturamento, regularização de CNPJ e controle financeiro. Conteúdo gratuito e prático.",
    canonical: "/artigos",
  });

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeCategory === "Todos" || a.category === activeCategory;
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = ARTICLES.filter((a) => a.featured);

  const goToArticle = (slug: string) => {
    setLocation(`/artigos/${slug}`);
    window.scrollTo(0, 0);
  };

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
            <span className="text-sm font-medium">EasyMei</span>
          </button>
          <span className="text-sm text-muted-foreground">Blog do MEI</span>
        </div>
      </header>

      {/* Hero — compacto */}
      <section className="py-10 md:py-14 border-b border-border/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-3">
                Conhecimento gratuito para MEIs
              </div>
              <h1 className="text-3xl md:text-5xl font-light tracking-wide">
                Blog do <span className="text-primary">MEI</span>
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-lg">
                Artigos práticos sobre DAS, declaração, nota fiscal e finanças para manter seu MEI em dia.
              </p>
            </motion.div>

            {/* Busca no topo em desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative w-full md:w-72"
            >
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filtros de categoria */}
      <section className="py-4 border-b border-border/20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
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
      </section>

      <div className="container mx-auto px-6 md:px-12 py-10">
        {/* Destaques — só quando sem filtro */}
        {activeCategory === "Todos" && search === "" && (
          <div className="mb-10">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">Destaques</p>
            <div className="grid md:grid-cols-2 gap-5">
              {featured.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group relative rounded-3xl border border-border/50 bg-card p-8 hover:border-primary/30 transition-all cursor-pointer flex flex-col justify-between min-h-[180px]"
                  onClick={() => goToArticle(article.slug)}
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
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                    <span className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Ler artigo <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Grade de artigos */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5">
            {activeCategory === "Todos" && search === "" ? "Todos os artigos" : `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""}`}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Nenhum artigo encontrado para "{search}".
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group rounded-2xl border border-border/50 bg-card p-6 hover:border-primary/30 transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => goToArticle(article.slug)}
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
      </div>

      {/* CTA */}
      <section className="py-14 border-t border-border/30 bg-secondary/20">
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
