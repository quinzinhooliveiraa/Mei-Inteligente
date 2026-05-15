import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { ARTICLES, CATEGORY_COLORS } from "./articles-data";
import { useSEO } from "./hooks/useSEO";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl md:text-2xl font-semibold text-foreground mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-base md:text-lg font-semibold text-foreground mt-6 mb-2">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-primary/50 pl-5 py-2 my-5 text-muted-foreground italic bg-primary/5 rounded-r-lg">
          {renderInline(line.replace("> ", ""))}
        </blockquote>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-none space-y-2.5 my-5">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2.5 text-muted-foreground">
              <span className="text-primary mt-1.5 shrink-0">▸</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].includes("---")) {
          rows.push(lines[i].split("|").filter(c => c.trim() !== "").map(c => c.trim()));
        }
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6 rounded-xl border border-border/50">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/40">
                {rows[0]?.map((cell, j) => (
                  <th key={j} className="text-left py-3 px-4 text-foreground font-semibold">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, j) => (
                <tr key={j} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                  {row.map((cell, k) => (
                    <td key={k} className="py-3 px-4 text-muted-foreground">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed my-4 text-[15px] md:text-base">
          {renderInline(line)}
        </p>
      );
    }

    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();

  const article = ARTICLES.find(a => a.slug === params.slug);

  useSEO({
    title: article ? `${article.title} | Blog do MEI` : "Artigo não encontrado | EasyMei",
    description: article ? article.excerpt : "Artigo não encontrado no Blog do MEI.",
    canonical: article ? `/artigos/${article.slug}` : "/artigos",
    ogType: "article",
    jsonLd: article ? {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "datePublished": article.date,
      "author": { "@type": "Organization", "name": "EasyMei" },
      "publisher": {
        "@type": "Organization",
        "name": "EasyMei",
        "logo": { "@type": "ImageObject", "url": "https://easymei.com.br/logo.png" }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": `https://easymei.com.br/artigos/${article.slug}` }
    } : undefined,
  });

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Artigo não encontrado.</p>
        <button onClick={() => setLocation("/artigos")} className="text-primary hover:underline flex items-center gap-1">
          <ArrowLeft size={14} /> Voltar para o blog
        </button>
      </div>
    );
  }

  const others = ARTICLES.filter(a => a.slug !== article.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/artigos")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Blog do MEI</span>
          </button>
          <button
            onClick={() => setLocation("/")}
            className="text-sm text-muted-foreground hover:text-primary transition-colors hidden md:block"
          >
            EasyMei
          </button>
        </div>
      </header>

      {/* Layout com sidebar em desktop */}
      <div className="container mx-auto px-6 md:px-12 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 max-w-6xl mx-auto">

          {/* Conteúdo principal */}
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[article.category]}`}>
                  <Tag size={10} className="inline mr-1" />
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} /> {article.readTime} de leitura
                </span>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-semibold leading-snug mb-8">
                {article.title}
              </h1>

              <div className="border-t border-border/50 mb-8" />

              {/* Content */}
              <div className="text-[15px] md:text-base">
                {renderContent(article.content)}
              </div>

              {/* CTA mobile — aparece só em mobile */}
              <div className="mt-12 rounded-2xl bg-primary/10 border border-primary/20 p-6 text-center lg:hidden">
                <p className="text-sm text-muted-foreground mb-1">Cansado da burocracia?</p>
                <p className="font-semibold text-base mb-4">A EasyMei resolve tudo por você.</p>
                <button
                  onClick={() => { setLocation("/"); setTimeout(() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors text-sm"
                >
                  Agendar diagnóstico <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </main>

          {/* Sidebar — só em desktop */}
          <aside className="hidden lg:flex flex-col gap-6 w-72 xl:w-80 shrink-0">
            {/* CTA sticky */}
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Cansado da burocracia?</p>
                <p className="font-semibold text-base mb-4 leading-snug">A EasyMei resolve tudo por você.</p>
                <button
                  onClick={() => { setLocation("/"); setTimeout(() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors text-sm"
                >
                  Diagnóstico gratuito <ArrowRight size={14} />
                </button>
                <a
                  href="https://wa.me/553391240627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 border border-border text-muted-foreground font-medium px-5 py-2.5 rounded-full hover:border-primary/50 hover:text-primary transition-colors text-sm"
                >
                  Falar pelo WhatsApp
                </a>
              </div>

              {/* Leia também */}
              {others.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Leia também</p>
                  <div className="space-y-3">
                    {others.map(a => (
                      <button
                        key={a.id}
                        onClick={() => { setLocation(`/artigos/${a.slug}`); window.scrollTo(0, 0); }}
                        className="w-full text-left group rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[a.category]}`}>
                            {a.category}
                          </span>
                          <span className="text-xs text-muted-foreground"><Clock size={10} className="inline mr-0.5" />{a.readTime}</span>
                        </div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors leading-snug">{a.title}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setLocation("/artigos")}
                    className="mt-4 text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    Ver todos os artigos <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
