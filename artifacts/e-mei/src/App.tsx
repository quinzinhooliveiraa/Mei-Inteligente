import React from "react";
import { useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import { useSEO } from "./hooks/useSEO";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LineChart,
  BellRing,
  Wallet,
  ShieldCheck,
  Menu,
  X,
  Star,
  Calendar,
  TrendingDown,
  AlertCircle,
  HelpCircle,
  Instagram
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function CalendlyWidget() {
  React.useEffect(() => {
    if (document.querySelector('script[src*="calendly"]')) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-3xl overflow-hidden"
      data-url="https://calendly.com/crbn-contador/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=7cce20"
      style={{ minWidth: 320, height: 700 }}
    />
  );
}

function useCounter(target: number, duration: number, inView: boolean) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    setCount(0);
    const steps = Math.ceil(duration / 16);
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function StatBar({ pct, delay = 0, inView }: { pct: number; delay?: number; inView: boolean }) {
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(124,206,32,0.5)]"
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function StatsSection() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const count126 = useCounter(126, 1800, inView);
  const count38 = useCounter(38, 1600, inView);
  const count717 = useCounter(717, 2000, inView);

  const stats = [
    {
      value: "1 em 3",
      suffix: "",
      label: "MEIs encerram por falta de controle financeiro",
      note: "Não por falta de clientes",
      pct: 33,
      delay: 0,
    },
    {
      value: "R$ " + count717.toLocaleString("pt-BR"),
      suffix: " bi",
      label: "movimentados por micro e pequenos negócios",
      note: "Impacto direto no PIB",
      pct: 77,
      delay: 0.1,
    },
    {
      value: (count126 / 10).toFixed(1).replace(".", ","),
      suffix: " mi",
      label: "MEIs ativos no Brasil",
      note: "Fonte: Receita Federal 2025",
      pct: 90,
      delay: 0.2,
    },
    {
      value: (count38 / 10).toFixed(1).replace(".", ","),
      suffix: " mi",
      label: "novos MEIs abertos em 2025",
      note: "Crescimento recorde no país",
      pct: 62,
      delay: 0.3,
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12">

        {/* Ponte narrativa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Você não está sozinho nisso. São <strong className="text-foreground">mais de 12 milhões de brasileiros</strong> que escolheram empreender pelo próprio MEI. E a maioria enfrenta os mesmos desafios.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-5 md:p-7 flex flex-col gap-4"
            >
              <div>
                <p className="text-2xl md:text-3xl font-light tracking-tight">
                  <span className="text-primary">{s.value}</span>
                  <span className="text-sm md:text-base text-muted-foreground">{s.suffix}</span>
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-snug">{s.label}</p>
                <p className="text-[10px] text-muted-foreground/40 mt-1 italic">{s.note}</p>
              </div>
              <StatBar pct={s.pct} delay={s.delay + 0.3} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RealidadeSection() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">

        {/* Pergunta central */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
            O problema que ninguém fala
          </div>
          <h2 className="text-2xl md:text-5xl font-light tracking-wide mb-6 leading-[1.25]">
            Trabalhar muito não é suficiente.{" "}
            <br className="hidden md:block" />
            <span className="text-primary">Organização é o que transforma esforço em resultado.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A maioria dos MEIs não fecha por falta de clientes. Fecha por não saber exatamente onde está o dinheiro, o que deve, o que lucra e o que precisa mudar.
          </p>
        </motion.div>

        {/* Cards de problema */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: <AlertCircle className="w-6 h-6" />,
              title: "DAS acumulado",
              desc: "Muitos MEIs acumulam guias em aberto sem perceber, gerando juros, multas e risco de perder o CNPJ.",
            },
            {
              icon: <TrendingDown className="w-6 h-6" />,
              title: "Fechamento por descontrole",
              desc: "Boa parte dos negócios encerra não por falta de clientes, mas por falta de planejamento e controle financeiro.",
            },
            {
              icon: <HelpCircle className="w-6 h-6" />,
              title: "\"Quanto eu realmente lucro?\"",
              desc: "A maioria dos MEIs não consegue responder com precisão se o negócio dá lucro ou apenas mantém as contas girando.",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass rounded-3xl p-7 border border-border/50 hover:border-amber-500/20 transition-colors group"
            >
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                {p.icon}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}

export default function App() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useSEO({
    title: "EasyMei — Gestão de MEI Inteligente | DAS, Notas e Declaração",
    description: "A EasyMei cuida de toda a burocracia do seu MEI: paga o DAS, emite notas fiscais e envia a declaração anual. Foque no seu negócio, a gente faz o resto. Plano gratuito disponível.",
    canonical: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "EasyMei",
      "description": "Gestão burocrática inteligente para Microempreendedores Individuais (MEI).",
      "url": "https://easymei.com.br",
      "telephone": "+5533912406270",
      "priceRange": "R$0 - R$29,90/mês",
      "areaServed": { "@type": "Country", "name": "Brasil" },
      "sameAs": ["https://www.instagram.com/easy.mei/"]
    }
  });

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground">

      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="EasyMei" className="h-16 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Serviços</a>
            <a href="#sobre" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sobre</a>
            <a href="#agendar" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Diagnóstico gratuito</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <a href="/artigos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-6 flex items-center gap-2"
              onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Calendar size={16} /> Agendar uma conversa
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6">
          <a href="#funcionalidades" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium border-b border-border pb-4">Serviços</a>
          <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium border-b border-border pb-4">Sobre</a>
          <a href="#agendar" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium border-b border-border pb-4">Diagnóstico gratuito</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium border-b border-border pb-4">FAQ</a>
          <a href="/artigos" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium border-b border-border pb-4">Blog</a>
          <div className="flex flex-col gap-4 mt-8">
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 rounded-full flex items-center gap-2 justify-center"
              onClick={() => { setMobileMenuOpen(false); document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              <Calendar size={20} /> Agendar uma conversa
            </Button>
          </div>
        </div>
      )}

      {/* Hero — abertura empática */}
      <section className="pt-24 pb-16 md:pt-48 md:pb-32 px-6 md:px-12 container mx-auto relative">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-orb-drift" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-primary/6 rounded-full blur-[100px] -z-10 pointer-events-none animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-10 left-10 w-[200px] h-[200px] bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none animate-float-reverse" style={{ animationDelay: "1s" }} />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-primary text-sm font-medium mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Gestão de MEI terceirizada
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-[2.1rem] leading-[1.2] md:text-7xl font-light tracking-wide mb-5 md:leading-[1.1]">
              Você cuida do negócio.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">A gente cuida do resto.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground mb-7 leading-relaxed max-w-xl">
              DAS em dia, notas emitidas, declaração feita. A gente assume toda a burocracia do seu MEI para você focar no que realmente importa: trabalhar e crescer.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-13 px-7 text-base md:text-lg font-semibold rounded-full group"
                onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}
              >
                Agendar uma conversa
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2 shrink-0">
                {[
                  { initials: "AM", bg: "#7cce20" },
                  { initials: "RS", bg: "#4a9e0f" },
                  { initials: "CL", bg: "#2d7a08" },
                  { initials: "JP", bg: "#9be040" },
                ].map((u, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-black"
                    style={{ background: u.bg }}
                  >
                    {u.initials}
                  </div>
                ))}
              </div>
              <p>Mais de <strong className="text-foreground">200 MEIs</strong> com a burocracia resolvida todo mês.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            {/* Glow behind */}
            <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl -z-10" />

            {/* Dashboard card */}
            <div className="rounded-3xl border border-border/60 bg-[#1c1c1c] shadow-2xl overflow-hidden">

              {/* Topbar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="EasyMei" className="h-6 w-auto" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">CNPJ regular</span>
                </div>
              </div>

              <div className="p-5 space-y-4">

                {/* Cards de resumo */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#252525] rounded-2xl p-4 border border-white/5">
                    <p className="text-[11px] text-muted-foreground mb-1">Receita em Maio</p>
                    <p className="text-xl font-bold">R$ 4.250</p>
                    <div className="flex items-center gap-1 mt-1">
                      <LineChart size={11} className="text-primary" />
                      <span className="text-[10px] text-primary font-medium">+12% vs abril</span>
                    </div>
                  </div>
                  <div className="bg-[#252525] rounded-2xl p-4 border border-white/5">
                    <p className="text-[11px] text-muted-foreground mb-1">Limite MEI anual</p>
                    <p className="text-xl font-bold">R$ 81k</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-amber-400 font-medium">28% utilizado</span>
                    </div>
                  </div>
                </div>

                {/* Barra do limite */}
                <div className="bg-[#252525] rounded-2xl p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium">Faturamento acumulado 2025</p>
                    <span className="text-xs text-primary font-bold">R$ 22.750</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "28%" }}
                      transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      style={{ boxShadow: "0 0 10px rgba(124,206,32,0.5)" }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">R$ 0</span>
                    <span className="text-[10px] text-muted-foreground">Limite: R$ 81.000</span>
                  </div>
                </div>

                {/* DAS e mini gráfico */}
                <div className="grid grid-cols-5 gap-3">

                  {/* DAS */}
                  <div className="col-span-2 bg-[#252525] rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
                    <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center mb-3">
                      <CheckCircle2 size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">DAS Maio</p>
                      <p className="text-sm font-bold text-primary">Pago</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">R$ 71,60</p>
                    </div>
                  </div>

                  {/* Gráfico de barras mini */}
                  <div className="col-span-3 bg-[#252525] rounded-2xl p-4 border border-white/5">
                    <p className="text-[10px] text-muted-foreground mb-3">Últimos 6 meses</p>
                    <div className="flex items-end gap-1.5 h-14">
                      {[40, 65, 45, 80, 55, 100].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            background: i === 5
                              ? "rgba(124,206,32,1)"
                              : `rgba(124,206,32,${0.15 + i * 0.07})`,
                            boxShadow: i === 5 ? "0 0 8px rgba(124,206,32,0.4)" : "none"
                          }}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.6, delay: 0.9 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Última nota emitida */}
                <div className="bg-[#252525] rounded-2xl px-4 py-3 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <FileText size={14} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">NFS-e emitida</p>
                      <p className="text-[10px] text-muted-foreground">Cliente: Loja ABC · R$ 850,00</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">Hoje</span>
                </div>

              </div>
            </div>

            {/* Badge flutuante */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 glass-strong rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-2.5 border border-border/50"
            >
              <BellRing size={14} className="text-primary" />
              <div>
                <p className="text-[11px] font-semibold">DAS vence em 5 dias</p>
                <p className="text-[10px] text-muted-foreground">Maio · R$ 71,60</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dados do mercado — contextualização */}
      <StatsSection />

      {/* Realidade do MEI — o problema */}
      <RealidadeSection />

      {/* Funcionalidades — a solução */}
      <section id="funcionalidades" className="py-16 md:py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-light tracking-wide mb-4 md:mb-5">
              O que fazemos pelo seu MEI,{" "}
              <span className="text-primary">todo mês.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Você nos repassa as informações. A gente cuida de tudo. Sem app para aprender, sem processo complicado, sem dor de cabeça.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Wallet className="w-6 h-6" />,
                title: "DAS em dia, sem falta",
                desc: "Geramos e enviamos a guia DAS todo mês com antecedência. Você só paga. Chega de multa e juros por esquecimento."
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Notas emitidas por nós",
                desc: "Manda os dados do serviço prestado e a gente emite a NFS-e no portal da sua prefeitura. Rápido, sem erro, sem dor de cabeça."
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Relatório mensal de receitas",
                desc: "Todo mês você recebe um resumo claro: quanto entrou, quanto saiu, quanto já faturou no ano e quanto ainda pode faturar."
              },
              {
                icon: <BellRing className="w-6 h-6" />,
                title: "Você nunca é pego de surpresa",
                desc: "Vencimentos, limites, obrigações. Você recebe um aviso antes de qualquer prazo. Nunca mais acorda com uma multa no CNPJ."
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Declaração anual sem estresse",
                desc: "Na época da DASN-SIMEI, reunimos todos os dados do ano e fazemos a transmissão para você. Você só confirma os números."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Histórico sempre organizado",
                desc: "Cada cliente, cada nota, cada pagamento registrado. Quando precisar de qualquer informação do seu MEI, está ali, organizado."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass p-6 md:p-8 rounded-3xl hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(124,206,32,0.10)] transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium tracking-wide mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre a EasyMei */}
      <section id="sobre" className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Sobre a EasyMei</p>
              <h2 className="text-2xl md:text-4xl font-light tracking-wide leading-snug mb-6">
                Mais do que assessoria —{" "}
                <span className="text-primary">parceiros da sua jornada.</span>
              </h2>
              <div className="w-12 h-px bg-primary mb-6" />
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Na EasyMei, acreditamos que o microempreendedor deve focar no crescimento do seu negócio — e não perder tempo com burocracias.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed"
            >
              <p>
                Nossa missão é simplificar a rotina do MEI através de <strong className="text-foreground">organização financeira, planejamento estratégico, consultoria personalizada</strong> e suporte completo nas obrigações do dia a dia — emissão de DAS, acompanhamento fiscal e orientação empresarial.
              </p>
              <p>
                Sabemos que muitos empreendedores começam sozinhos e enfrentam dificuldades para manter tudo em ordem. Por isso, criamos uma solução prática, acessível e humanizada, ajudando o MEI a ter mais <strong className="text-foreground">controle, segurança e tranquilidade</strong> para crescer de forma sustentável.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diagnóstico — o primeiro passo personalizado */}
      <section id="agendar" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5"
            >
              <Calendar size={14} /> Diagnóstico gratuito · 45 minutos
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-5xl font-light tracking-wide mb-5"
            >
              Antes de qualquer decisão,{" "}
              <span className="text-primary">entenda onde você está de verdade.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground"
            >
              Numa conversa de 45 minutos, analisamos juntos a situação real do seu negócio. DAS em dia? Faturamento no limite? Você realmente lucra? Você sai com respostas claras e um caminho definido.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-4"
            >
              {[
                { icon: "🔍", title: "Entendemos sua situação atual", desc: "Olhamos o que está em dia, o que está atrasado, quais riscos você tem agora e o que precisa de atenção imediata." },
                { icon: "💡", title: "Você sai com clareza", desc: "Sem jargão, sem enrolação. Em 45 minutos você entende exatamente o que está acontecendo no seu MEI." },
                { icon: "🗺️", title: "Traçamos um caminho juntos", desc: "Se fizer sentido trabalharmos juntos, explicamos como funciona o serviço e combinamos os próximos passos." },
                { icon: "🔒", title: "Sem pressão, sem script de vendas", desc: "Se não fizer sentido, tudo bem. A conversa já tem valor por si mesma e você sai com informações úteis de qualquer forma." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 flex gap-4 items-start"
                >
                  <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-3 glass rounded-3xl overflow-hidden border border-border/50"
            >
              <CalendlyWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Depoimentos — prova social */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-light tracking-wide mb-3">
              Quem terceirizou a burocracia não volta atrás.
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Veja o que mudou para quem decidiu parar de resolver sozinho e passou a ter alguém cuidando do MEI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Mariana Silva",
                role: "Designer Freelancer",
                content: "Perdia horas todo mês tentando emitir nota no site da prefeitura, sempre com algum erro. Agora mando os dados e a nota chega no meu e-mail pronta. Não tem preço.",
                img: "1"
              },
              {
                name: "Carlos Eduardo",
                role: "Consultor de TI",
                content: "Já paguei multa por esquecer o DAS. Hoje recebo tudo organizado, no prazo certo. Nunca mais precisei me preocupar com isso. É exatamente o que eu precisava.",
                img: "2"
              },
              {
                name: "Juliana Costa",
                role: "Social Media",
                content: "A declaração anual que eu achava que ia ser um pesadelo foi resolvida em um dia. Me pediram os dados, eu mandei, e eles cuidaram de tudo. Simples assim.",
                img: "5"
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass p-8 rounded-3xl hover:shadow-[0_8px_40px_rgba(124,206,32,0.08)] transition-shadow flex flex-col"
              >
                <div className="flex gap-1 text-primary mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-base leading-relaxed flex-1 mb-8">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0">
                    <img src={`https://i.pravatar.cc/100?img=${t.img}`} alt={t.name} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — tira as últimas dúvidas antes de decidir */}
      <section id="faq" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-3">Ainda tem dúvidas? Normal.</h2>
            <p className="text-muted-foreground text-sm">As perguntas que mais aparecem antes de começar.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {[
              {
                q: "Como vocês acessam os dados do meu MEI?",
                a: "Você nos repassa os acessos necessários ao portal do MEI ou nos autoriza pontualmente conforme a demanda. Trabalhamos sempre com sigilo e responsabilidade, em conformidade com a LGPD."
              },
              {
                q: "Vocês emitem nota para qualquer cidade?",
                a: "Sim. Trabalhamos com NFS-e pelo padrão nacional e pelos portais das prefeituras de todo o Brasil. Se sua cidade tiver sistema próprio, já conhecemos o processo."
              },
              {
                q: "Como funciona a Declaração Anual?",
                a: "Durante o ano, organizamos todas as suas receitas. Na época da DASN-SIMEI, você nos confirma os dados e fazemos a transmissão para a Receita Federal. Você não precisa fazer nada."
              },
              {
                q: "Qual o valor do serviço?",
                a: "O valor é definido conforme o volume de atividades do seu MEI: número de notas, movimentação financeira e necessidades específicas. Combinamos tudo na conversa de diagnóstico, sem surpresa."
              },
              {
                q: "Vocês pagam o DAS por mim?",
                a: "Geramos a guia e enviamos o código Pix para você pagar no seu banco. O pagamento é sempre feito por você. A gente cuida de gerar, conferir e avisar com antecedência."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final — fecha o arco narrativo */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <h2 className="text-2xl md:text-6xl font-light tracking-wide mb-6">
            Você chegou até aqui por algum motivo.
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Provavelmente porque sente que dá para organizar melhor. Que dá para crescer mais. Que falta uma equipe de confiança cuidando dessa parte. A gente pode ser esse time. Começa com uma conversa de 45 minutos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg font-bold rounded-full animate-glow-pulse hover:scale-105 transition-transform inline-flex items-center gap-2"
              onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Calendar size={18} /> Fazer meu diagnóstico gratuito
            </Button>
            <a
              href="https://wa.me/5533912406270"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-8 text-lg font-semibold rounded-full border border-border hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2 text-muted-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              Falar pelo WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Gratuito. Sem compromisso. Sem enrolação.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-20 pb-10 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <img src="/logo.png" alt="EasyMei" className="h-12 w-auto" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Cuidamos de toda a burocracia do seu MEI para você focar no que realmente importa.
              </p>
              <div className="flex items-center gap-4 mt-1">
                <a
                  href="https://www.instagram.com/easy.mei/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram da EasyMei"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://wa.me/5533912406270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="WhatsApp da EasyMei"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Serviços</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><button onClick={() => document.getElementById("funcionalidades")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors text-left">O que fazemos</button></li>
                <li><button onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors text-left">Diagnóstico gratuito</button></li>
                <li><button onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors text-left">Perguntas frequentes</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Para você</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="/artigos" className="hover:text-primary transition-colors">Blog do MEI</a></li>
                <li><a href="/artigos" className="hover:text-primary transition-colors">Tire suas dúvidas</a></li>
                <li><a href="/artigos" className="hover:text-primary transition-colors">Guia do MEI iniciante</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Empresa</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><button onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors text-left">Sobre nós</button></li>
                <li><a href="https://wa.me/5533912406270" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="/termos" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="/privacidade" className="hover:text-primary transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>
              <button
                onClick={() => setLocation("/app")}
                className="cursor-default select-none"
                tabIndex={-1}
                aria-hidden="true"
              >©</button>
              {" "}{new Date().getFullYear()} EasyMei. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
