import React from "react";
import { useLocation } from "wouter";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  FileText, 
  LineChart, 
  BellRing, 
  Wallet, 
  ShieldCheck,
  Menu,
  X,
  Star,
  Calendar
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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
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

  const meis = useCounter(10000, 1800, inView);
  const sat = useCounter(98, 1400, inView);
  const min = useCounter(2, 1000, inView);
  const notas = useCounter(500000, 2000, inView);

  const stats = [
    {
      value: meis.toLocaleString("pt-BR"),
      suffix: "+",
      label: "MEIs ativos na plataforma",
      pct: 82,
      delay: 0,
    },
    {
      value: sat,
      suffix: "%",
      label: "de satisfação dos usuários",
      pct: 98,
      delay: 0.1,
    },
    {
      value: notas.toLocaleString("pt-BR"),
      suffix: "+",
      label: "notas fiscais emitidas",
      pct: 70,
      delay: 0.2,
    },
    {
      value: min,
      suffix: " min",
      label: "para completar o cadastro",
      pct: 15,
      delay: 0.3,
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-5 md:p-7 flex flex-col gap-4"
            >
              <div>
                <p className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                  {s.value}
                  <span className="text-primary">{s.suffix}</span>
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 leading-snug">{s.label}</p>
              </div>
              <StatBar pct={s.pct} delay={s.delay + 0.3} inView={inView} />
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
  
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl leading-none">
              e
            </div>
            <span className="font-light text-2xl tracking-widest">e-mei</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-full px-6 flex items-center gap-2" onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}>
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
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 rounded-full flex items-center gap-2 justify-center" onClick={() => { setMobileMenuOpen(false); document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" }); }}>
              <Calendar size={20} /> Agendar uma conversa
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-48 md:pb-32 px-6 md:px-12 container mx-auto relative">
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-orb-drift" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-primary/6 rounded-full blur-[100px] -z-10 pointer-events-none animate-float-slow" style={{animationDelay:"2s"}} />
        <div className="absolute bottom-10 left-10 w-[200px] h-[200px] bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none animate-float-reverse" style={{animationDelay:"1s"}} />
        
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-primary text-sm font-medium mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              MEI inteligente
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-[2.1rem] leading-[1.2] md:text-7xl font-light tracking-wide mb-5 md:leading-[1.1]">
              O controle do seu MEI,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300 whitespace-nowrap">sem burocracia.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-base md:text-xl text-muted-foreground mb-7 leading-relaxed max-w-xl">
              Emita notas, pague seu DAS, controle receitas e evite multas. Tudo em um só lugar, feito para quem não tem tempo a perder.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-13 px-7 text-base md:text-lg font-semibold rounded-full group" onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}>
                Começar grátis
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="h-13 px-7 text-base md:text-lg font-medium rounded-full border-border hover:bg-secondary" onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}>
                Ver como funciona
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2 shrink-0">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p>Mais de <strong className="text-foreground">10.000</strong> MEIs no Brasil.</p>
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
              <img src={heroImage} alt="Dashboard App" className="w-full h-full object-cover opacity-90 mix-blend-screen" />
              
              {/* Floating UI elements — glass */}
              <div className="absolute top-6 right-6 glass-strong rounded-2xl p-4 shadow-2xl flex items-center gap-4 animate-float" style={{animationDelay:"0.5s"}}>
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">DAS Pago</p>
                  <p className="text-xs text-muted-foreground">Mês de Maio</p>
                </div>
              </div>

              <div className="absolute bottom-8 left-6 right-6 glass-strong rounded-2xl p-5 shadow-2xl animate-float-reverse" style={{animationDelay:"1s"}}>
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

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section id="funcionalidades" className="py-16 md:py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-light tracking-wide mb-4 md:mb-6">Tudo que seu negócio precisa — <span className="text-primary">nada que não precisa.</span></h2>
            <p className="text-base md:text-lg text-muted-foreground">Desenhado especificamente para as necessidades do Microempreendedor Individual no Brasil.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Wallet className="w-6 h-6" />,
                title: "Controle de DAS",
                desc: "Gere e pague sua guia DAS mensal diretamente pela plataforma. Nunca mais esqueça o vencimento."
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Emissão de Notas",
                desc: "Emita NFS-e em poucos cliques, integrada com as principais prefeituras do país."
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Dashboard Financeiro",
                desc: "Acompanhe suas receitas, despesas e limite de faturamento anual do MEI em tempo real."
              },
              {
                icon: <BellRing className="w-6 h-6" />,
                title: "Alertas Inteligentes",
                desc: "Receba notificações sobre vencimentos, limites de faturamento e obrigações fiscais."
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Declaração Anual",
                desc: "Gere os dados para sua Declaração Anual do Simples Nacional (DASN-SIMEI) automaticamente."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Gestão de Clientes",
                desc: "Cadastre seus clientes e tenha um histórico completo de serviços prestados e notas emitidas."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass p-6 md:p-8 rounded-3xl hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(124,206,32,0.10)] transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium tracking-wide mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-5xl font-light tracking-wide mb-5">Simplifique sua rotina em <span className="text-primary">3 passos</span></h2>
              <p className="text-lg text-muted-foreground mb-12">Deixe a burocracia com a gente e foque no que você faz de melhor: o seu trabalho.</p>
              
              <div className="space-y-12">
                {[
                  { step: "01", title: "Cadastre-se grátis", desc: "Crie sua conta em menos de 2 minutos usando apenas seu CNPJ." },
                  { step: "02", title: "Configure seu MEI", desc: "O sistema importa automaticamente seus dados da Receita Federal." },
                  { step: "03", title: "Tenha tudo no controle", desc: "Pronto! Suas guias, notas e relatórios já estão disponíveis no dashboard." }
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
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
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

      {/* Calendly / Agendamento Section */}
      <section id="agendar" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5"
            >
              <Calendar size={14} /> Conversa gratuita · 30 minutos
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-5xl font-light tracking-wide mb-5"
            >
              Vamos conversar sobre o seu MEI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground"
            >
              Agende uma conversa gratuita e descubra como o e-mei pode simplificar a gestão do seu negócio. Sem compromisso.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
            {/* Benefícios */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-5"
            >
              {[
                { icon: "🎯", title: "Diagnóstico gratuito", desc: "Entendemos sua situação atual e mostramos onde o e-mei pode ajudar." },
                { icon: "⚡", title: "Demonstração ao vivo", desc: "Veja o sistema funcionando na prática, com dados reais do seu segmento." },
                { icon: "💡", title: "Plano personalizado", desc: "Cada MEI é único. Montamos a solução ideal para o seu caso." },
                { icon: "🔒", title: "Sem pressão de venda", desc: "Uma conversa leve e focada em tirar suas dúvidas." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 flex gap-4"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Calendly widget */}
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

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-4xl font-light tracking-wide text-center mb-10 md:mb-16">Quem usa, recomenda.</h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Mariana Silva",
                role: "Designer Freelancer",
                content: "Antes eu perdia horas todo mês tentando entender site da prefeitura para emitir nota. Agora faço tudo pelo app em 2 minutos. Mudou minha vida.",
                img: "1"
              },
              {
                name: "Carlos Eduardo",
                role: "Consultor de TI",
                content: "Aviso de vencimento do DAS é a melhor coisa. Já paguei multa várias vezes por esquecer a data. O dashboard financeiro também é incrível.",
                img: "2"
              },
              {
                name: "Juliana Costa",
                role: "Social Media",
                content: "Fiz minha declaração anual com um clique este ano. O sistema já tinha puxado todas as minhas receitas. Super recomendo para qualquer MEI.",
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
                className="glass p-8 rounded-3xl hover:shadow-[0_8px_40px_rgba(124,206,32,0.08)] transition-shadow"
              >
                <div className="flex gap-1 text-primary mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg mb-8 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${t.img}`} alt={t.name} />
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-4">Dúvidas Frequentes</h2>
            <p className="text-muted-foreground">Tudo o que você precisa saber sobre o e-mei.</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Como o e-mei acessa meus dados do MEI?",
                a: "Conectamos de forma segura com os sistemas da Receita Federal usando seu CNPJ. Nós apenas lemos e organizamos suas informações, mantendo tudo 100% seguro e em conformidade com a LGPD."
              },
              {
                q: "Posso emitir nota fiscal para qualquer cidade?",
                a: "O e-mei é integrado com a emissão do padrão nacional (NFS-e Nacional) e também com os sistemas de mais de 1000 municípios brasileiros. Se sua cidade exigir emissão própria, nosso sistema irá direcionar você corretamente."
              },
              {
                q: "Como funciona a geração da Declaração Anual?",
                a: "Durante o ano, o sistema soma todas as suas receitas (notas emitidas + receitas informadas manualmente). Na época da declaração, consolidamos esses dados e transmitimos para a Receita com apenas um clique no plano Pro."
              },
              {
                q: "Se eu cancelar o plano Pro, perco meus dados?",
                a: "Não! Seus dados continuam seguros na sua conta, que voltará para o plano Básico gratuito. Você só perderá o acesso às funcionalidades exclusivas do plano Pro, como emissão de notas pelo nosso sistema."
              },
              {
                q: "Vocês pagam a guia DAS por mim?",
                a: "Nós geramos a guia e o código Pix/boleto para você realizar o pagamento no seu banco. Não debitamos valores automaticamente da sua conta para pagamento de impostos."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass rounded-xl px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <h2 className="text-2xl md:text-6xl font-light tracking-wide mb-6">Pronto para simplificar seu MEI?</h2>
          <p className="text-base md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Agende uma conversa gratuita e veja como o e-mei pode transformar a gestão do seu negócio em minutos por dia.
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-10 text-xl font-bold rounded-full animate-glow-pulse hover:scale-105 transition-transform mx-auto"
            onClick={() => document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" })}
          >
            Começar grátis
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">Leva menos de 2 minutos. Não pedimos cartão de crédito.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background pt-20 pb-10 border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl leading-none">
                  e
                </div>
                <span className="font-light text-2xl tracking-widest">e-mei</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                A plataforma inteligente que descomplica a vida do Microempreendedor Individual no Brasil.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Emissão de Notas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Planos e Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Segurança</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Blog do MEI</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Calculadora de Faturamento</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Guia do Iniciante</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
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
              {" "}{new Date().getFullYear()} e-mei Tecnologia S.A. Todos os direitos reservados.
            </p>
            <p>CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
