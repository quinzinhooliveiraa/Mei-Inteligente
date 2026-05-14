import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  BellRing,
  FileText,
  TrendingUp,
  Eye,
  EyeOff,
  ArrowLeft,
  Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: LayoutDashboard, label: "Dashboard completo do MEI" },
  { icon: TrendingUp, label: "Monitor do limite R$ 81.000" },
  { icon: BellRing, label: "Alertas automáticos de vencimento" },
  { icon: FileText, label: "Relatórios prontos para o contador" },
];

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = React.useState<"signup" | "login">("signup");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (tab === "signup" && !form.name.trim()) e.name = "Informe seu nome";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "E-mail inválido";
    if (!form.password || form.password.length < 6) e.password = "Mínimo 6 caracteres";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLocation(tab === "signup" ? "/onboarding" : "/");
    }, 1200);
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[48%] bg-[#1a1a1a] relative overflow-hidden px-14 py-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-80px] right-[-60px] w-[300px] h-[300px] bg-primary/6 rounded-full blur-[100px]" />
        </div>

        {/* Logo */}
        <button onClick={() => setLocation("/")} className="flex items-center gap-2.5 w-fit">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-base leading-none">
            E
          </div>
          <span className="text-lg font-semibold tracking-tight">EasyMei</span>
        </button>

        {/* Center content */}
        <div className="space-y-8">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">MEI inteligente</p>
            <h2 className="text-3xl font-light tracking-wide leading-snug mb-3">
              O controle do seu MEI,<br />
              <span className="text-primary">sem burocracia.</span>
            </h2>
            <p className="text-muted-foreground">Simples, rápido e inteligente.</p>
          </div>

          <ul className="space-y-4">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-primary" />
                </div>
                <span className="text-sm text-foreground/80">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom */}
        <p className="text-xs text-muted-foreground/50">© 2025 EasyMei · Todos os direitos reservados</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 border-b border-border">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              E
            </div>
            <span className="font-semibold">EasyMei</span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Back button desktop */}
            <button
              onClick={() => setLocation("/")}
              className="hidden lg:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={15} />
              Voltar ao site
            </button>

            <h1 className="text-2xl font-light tracking-wide mb-1">
              {tab === "signup" ? "Crie sua conta grátis" : "Bem-vindo de volta"}
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              {tab === "signup" ? "Organize seu MEI em segundos" : "Entre na sua conta EasyMei"}
            </p>

            {/* Tab switcher */}
            <div className="flex rounded-xl bg-secondary border border-border p-1 mb-8">
              {(["signup", "login"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setErrors({}); }}
                  className="relative flex-1 py-2 text-sm font-medium rounded-lg transition-colors"
                >
                  {tab === t && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-card border border-border rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${tab === t ? "text-foreground" : "text-muted-foreground"}`}>
                    {t === "signup" ? "Criar conta" : "Entrar"}
                  </span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {tab === "signup" && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-sm font-medium mb-1.5">Seu nome</label>
                    <input
                      type="text"
                      placeholder="Maria Silva"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                      className={`w-full h-11 rounded-xl bg-secondary border ${errors.name ? "border-red-500" : "border-border"} px-4 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-medium mb-1.5">E-mail</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                  className={`w-full h-11 rounded-xl bg-secondary border ${errors.email ? "border-red-500" : "border-border"} px-4 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium">Senha</label>
                  {tab === "login" && (
                    <button type="button" className="text-xs text-primary hover:underline">
                      Esqueci minha senha
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={form.password}
                    onChange={(e) => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: "" }); }}
                    className={`w-full h-11 rounded-xl bg-secondary border ${errors.password ? "border-red-500" : "border-border"} px-4 pr-11 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm shadow-[0_0_20px_rgba(124,206,32,0.25)] mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processando...
                  </span>
                ) : tab === "signup" ? "Criar minha conta →" : "Entrar →"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">ou continue com</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full h-11 rounded-xl bg-secondary border border-border flex items-center justify-center gap-2.5 text-sm font-medium hover:bg-secondary/70 transition-colors"
            >
              <Chrome size={17} className="text-foreground/70" />
              Continuar com Google
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-8">
              {tab === "signup" ? (
                <>Já tem conta?{" "}
                  <button onClick={() => setTab("login")} className="text-primary hover:underline font-medium">Entrar</button>
                </>
              ) : (
                <>Não tem conta?{" "}
                  <button onClick={() => setTab("signup")} className="text-primary hover:underline font-medium">Criar grátis</button>
                </>
              )}
            </p>

            {tab === "signup" && (
              <p className="text-center text-xs text-muted-foreground/50 mt-3">
                Ao criar sua conta você aceita os{" "}
                <span className="underline cursor-pointer">Termos de Uso</span> e a{" "}
                <span className="underline cursor-pointer">Política de Privacidade</span>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
