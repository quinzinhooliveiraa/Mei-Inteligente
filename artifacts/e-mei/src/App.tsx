import React from "react";
import { useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
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
  HelpCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "./assets/hero-illustration.png";

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const count126 = useCounter(126, 1800, inView);
  const count38 = useCounter(38, 1600, inView);
  const count717 = useCounter(717, 2000, inView);

  const stats = [
    {
      value: (count126 / 10).toFixed(1).replace(".", ","),
      suffix: " mi",
      label: "MEIs ativos no Brasil",
      note: "Fonte: Receita Federal 2025",
      pct: 90,
      delay: 0,
    },
    {
      value: (count38 / 10).toFixed(1).replace(".", ","),
      suffix: " mi",
      label: "novos MEIs abertos em 2025",
      note: "Crescimento recorde no país",
      pct: 62,
      delay: 0.1,
    },
    {
      value: "R$ " + count717.toLocaleString("pt-BR"),
      suffix: " bi",
      label: "movimentados por micro e pequenos negócios",
      note: "Impacto direto no PIB",
      pct: 77,
      delay: 0.2,
    },
    {
      value: "1 em 3",
      suffix: "",
      label: "MEIs encerram por falta de controle financeiro",
      note: "Não por falta de clientes",
      pct: 33,
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

        {/* Frases estratégicas */}
        <div className="grid sm:grid-cols-3 gap-3 max-w-5xl mx-auto mb-12">
          {[
            "Faturamento alto não significa lucro.",
            "Muitos MEIs fecham por falta de organização.",
            "Entender seu negócio é tão importante quanto vender.",
          ].map((frase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-secondary/40 border border-border/30"
            >
              <div className="w-1 h-8 bg-primary rounded-full shrink-0" />
              <p className="font-medium text-sm leading-snug">{frase}</p>
            </motion.div>
          ))}
        </div>

        {/* Virada narrativa: apresenta o e-mei como resposta */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="max-w-2xl mx-auto glass rounded-3xl p-8 md:p-10 border border-primary/20 text-center"
        >
          <p className="text-xl md:text-2xl font-light tracking-wide leading-snug mb-3">
            Foi exatamente por isso que criamos o EasyMei.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Para que cada MEI tenha clareza sobre o próprio negócio, controle sobre as obrigações e segurança para tomar decisões que façam o negócio crescer de verdade.
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold px-7 inline-flex items-center gap-2"
            onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Calendar size={16} /> Fazer meu diagnóstico gratuito
          </Button>
        </motion.div>

      </div>
    </section>
  );
}

export default function App() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl leading-none">e</div>
            <span className="font-light text-xl tracking-wide">EasyMei</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
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
          <a href="#funcionalidades" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium border-b border-border pb-4">Funcionalidades</a>
          <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium border-b border-border pb-4">Como funciona</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium border-b border-border pb-4">FAQ</a>
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
              MEI inteligente
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-[2.1rem] leading-[1.2] md:text-7xl font-light tracking-wide mb-5 md:leading-[1.1]">
              Você cuida do negócio.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">A gente cuida do resto.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground mb-7 leading-relaxed max-w-xl">
              DAS em dia, notas emitidas, receitas organizadas. O EasyMei resolve a parte chata para você parar de apagar incêndio e começar a crescer com segurança.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-13 px-7 text-base md:text-lg font-semibold rounded-full group"
                onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}
              >
                Começar grátis
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="h-13 px-7 text-base md:text-lg font-medium rounded-full border-border hover:bg-secondary"
                onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver como funciona
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2 shrink-0">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Mais de <strong className="text-foreground">10.000</strong> MEIs já organizaram o negócio com a gente.</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-lg aspect-[4/3] md:aspect-square lg:aspect-[4/3] xl:aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform rotate-3 scale-105 -z-10" />
            <div className="w-full h-full rounded-3xl overflow-hidden border border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm relative">
              <img src={heroImage} alt="Dashboard EasyMei" className="w-full h-full object-cover opacity-90 mix-blend-screen" />

              <div className="absolute top-6 right-6 glass-strong rounded-2xl p-4 shadow-2xl flex items-center gap-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">DAS Pago</p>
                  <p className="text-xs text-muted-foreground">Mês de Maio</p>
                </div>
              </div>

              <div className="absolute bottom-8 left-6 right-6 glass-strong rounded-2xl p-5 shadow-2xl animate-float-reverse" style={{ animationDelay: "1s" }}>
                <p className="text-sm text-muted-foreground mb-1">Receita Mensal</p>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">R$ 4.250<span className="text-sm text-muted-foreground font-normal">,00</span></p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <LineChart size={16} className="mr-1" />
                    +12%
                  </div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-primary w-[65%] rounded-full shadow-[0_0_8px_rgba(124,206,32,0.6)]" />
                </div>
              </div>
            </div>
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
              Cada funcionalidade foi criada{" "}
              <span className="text-primary">para resolver um problema real.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Sem funcionalidade inútil, sem curva de aprendizado. Só o que o MEI brasileiro realmente precisa no dia a dia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Wallet className="w-6 h-6" />,
                title: "Controle de DAS",
                desc: "Gere e pague sua guia DAS mensal diretamente pela plataforma. Sem risco de esquecer, sem risco de multa."
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Emissão de Notas",
                desc: "Emita NFS-e em poucos cliques, integrada com as principais prefeituras do país. Tudo em menos de 2 minutos."
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Dashboard Financeiro",
                desc: "Veja de forma clara quanto entrou, quanto saiu e quanto ainda dá para faturar no ano antes de atingir o limite do MEI."
              },
              {
                icon: <BellRing className="w-6 h-6" />,
                title: "Alertas Inteligentes",
                desc: "Receba avisos antes dos vencimentos, antes de bater o limite de faturamento e antes de qualquer problema se tornar uma dor de cabeça."
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Declaração Anual",
                desc: "Na hora da DASN-SIMEI, seus dados já estão prontos. Você transmite com um clique, sem precisar procurar nenhum número."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Gestão de Clientes",
                desc: "Histórico completo de quem contratou, quais serviços foram prestados e quais notas foram emitidas. Tudo organizado."
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

      {/* Como funciona — a prova que é simples */}
      <section id="como-funciona" className="py-16 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-5xl font-light tracking-wide mb-4">
                Começa em minutos.{" "}
                <span className="text-primary">Funciona pra sempre.</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-12">
                Não precisa instalar nada. Não precisa de contador. Não precisa de treinamento. Em três passos você já tem tudo organizado.
              </p>

              <div className="space-y-12">
                {[
                  { step: "01", title: "Crie sua conta grátis", desc: "Leva menos de 2 minutos. Só precisa do seu CNPJ para começar." },
                  { step: "02", title: "Configure seu MEI", desc: "O sistema importa seus dados direto da Receita Federal. Você não precisa digitar nada." },
                  { step: "03", title: "Tudo no controle", desc: "Suas guias, notas e relatórios já estão disponíveis. Só acessar e usar." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="flex gap-6 relative"
                  >
                    {i !== 2 && <div className="absolute left-6 top-16 bottom-[-3rem] w-px bg-border"></div>}
                    <div className="w-12 h-12 shrink-0 rounded-full bg-card border border-border flex items-center justify-center font-bold text-primary z-10">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium tracking-wide mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="glass rounded-3xl p-8 shadow-2xl relative animate-float-slow"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                  <div>
                    <h3 className="text-lg font-bold">Meu CNPJ</h3>
                    <p className="text-sm text-muted-foreground">12.345.678/0001-90</p>
                  </div>
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Regular
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-muted-foreground">
                        <Wallet size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">DAS Competência Abril</p>
                        <p className="text-xs text-primary">Vence em 5 dias</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Pagar</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-background border border-border rounded-xl opacity-75">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <CheckCircle2 size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground line-through">DAS Competência Março</p>
                        <p className="text-xs text-muted-foreground">Pago em 18/04</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">R$ 71,60</span>
                  </div>
                </div>
              </motion.div>
            </div>
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
              <Calendar size={14} /> Diagnóstico gratuito · 30 minutos
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
              Numa conversa de 30 minutos, analisamos juntos a situação real do seu negócio. DAS em dia? Faturamento no limite? Você realmente lucra? Você sai com respostas claras e um caminho definido.
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
                { icon: "🔍", title: "Análise real do seu negócio", desc: "Olhamos para DAS, faturamento, organização e pontos de risco específicos do seu caso." },
                { icon: "💡", title: "Você vai saber se lucra de verdade", desc: "Muita gente acha que vai bem. Na conversa, a realidade fica clara, sem julgamento." },
                { icon: "🗺️", title: "Sai com um plano na mão", desc: "Não é uma conversa vaga. Você sai sabendo exatamente o que precisa fazer primeiro." },
                { icon: "🔒", title: "Sem pressão, sem script de vendas", desc: "Se não fizer sentido para você, não tem problema. A conversa já vale por si mesma." },
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
              Quem organizou o MEI não volta atrás.
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Veja o que mudou para quem decidiu parar de improvisar e passou a ter controle real do negócio.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Mariana Silva",
                role: "Designer Freelancer",
                content: "Perdia horas todo mês tentando emitir nota no site da prefeitura. Hoje faço isso em 2 minutos pelo app. Não consigo imaginar voltar para o jeito antigo.",
                img: "1"
              },
              {
                name: "Carlos Eduardo",
                role: "Consultor de TI",
                content: "Já paguei multa por esquecer o DAS. Agora recebo aviso com antecedência e nunca mais atrasei. O dashboard financeiro ainda me ajudou a perceber que eu lucrava menos do que achava.",
                img: "2"
              },
              {
                name: "Juliana Costa",
                role: "Social Media",
                content: "Fiz minha declaração anual com um clique. O sistema já tinha todas as minhas receitas. Fiquei impressionada com o quanto era mais simples do que eu esperava.",
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
                q: "Como o EasyMei acessa meus dados do MEI?",
                a: "Conectamos com os sistemas da Receita Federal usando seu CNPJ. Apenas lemos e organizamos suas informações, sem alterar nada. Tudo em conformidade com a LGPD."
              },
              {
                q: "Posso emitir nota fiscal para qualquer cidade?",
                a: "Sim. O EasyMei é integrado com o padrão nacional NFS-e e com mais de 1.000 municípios. Se sua cidade tiver sistema próprio, o EasyMei vai te direcionar corretamente."
              },
              {
                q: "Como funciona a Declaração Anual?",
                a: "Durante o ano, o sistema registra todas as suas receitas automaticamente. Na época da DASN-SIMEI, você transmite tudo com um clique. Sem precisar buscar número nenhum."
              },
              {
                q: "Se eu cancelar, perco meus dados?",
                a: "Não. Seus dados ficam na conta, que volta para o plano gratuito. Você só perde acesso às funcionalidades Pro, como emissão de notas e livro caixa automático."
              },
              {
                q: "Vocês pagam o DAS por mim?",
                a: "Geramos a guia e o código Pix ou boleto para você pagar no seu banco. Não debitamos nada automaticamente."
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
            Provavelmente porque sente que dá para organizar melhor. Que dá para crescer mais. Que falta clareza sobre o próprio negócio. A gente pode ajudar com isso, começando por uma conversa de 30 minutos.
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-10 text-xl font-bold rounded-full animate-glow-pulse hover:scale-105 transition-transform inline-flex items-center gap-2"
            onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Calendar size={20} /> Fazer meu diagnóstico gratuito
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">Gratuito. Sem compromisso. Sem enrolação.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-20 pb-10 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl leading-none">e</div>
                <span className="font-light text-xl tracking-wide">EasyMei</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A plataforma EasyMei descomplica a vida do Microempreendedor Individual no Brasil.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Produto</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#funcionalidades" className="hover:text-primary transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Emissão de Notas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Segurança</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Recursos</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog do MEI</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guia do Iniciante</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm">Empresa</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
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
              {" "}{new Date().getFullYear()} EasyMei Tecnologia S.A. Todos os direitos reservados.
            </p>
            <p>CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
