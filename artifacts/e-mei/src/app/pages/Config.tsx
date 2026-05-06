import React from "react";
import { useApp } from "../AppContext";

export default function Config() {
  const {
    userName, cnpj, nomeNegocio, ramo, dasVencimento,
    setUserName, setCnpj, setNomeNegocio, setRamo, setDasVencimento,
  } = useApp();

  const [name, setName] = React.useState(userName);
  const [email, setEmail] = React.useState("joaquim@email.com");
  const [cnpjVal, setCnpjVal] = React.useState(cnpj);
  const [negocio, setNegocio] = React.useState(nomeNegocio);
  const [ramoVal, setRamoVal] = React.useState(ramo);
  const [dasDay, setDasDay] = React.useState(dasVencimento.toString());
  const [alerts, setAlerts] = React.useState({ a60: true, a80: true, a90: true });
  const [saved, setSaved] = React.useState(false);

  function handleSavePerfil() {
    setUserName(name);
    flashSave();
  }

  function handleSaveMei() {
    setCnpj(cnpjVal);
    setNomeNegocio(negocio);
    setRamo(ramoVal);
    setDasVencimento(parseInt(dasDay) || 20);
    flashSave();
  }

  function flashSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm p-5";
  const label = "block text-xs font-medium text-gray-500 mb-1.5";
  const input = "w-full h-10 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 focus:outline-none focus:border-[#7cce20] transition-colors";
  const section = "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2";

  return (
    <div className="space-y-5 max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-900">⚙️ Configurações</h1>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl">
          ✓ Dados salvos com sucesso!
        </div>
      )}

      {/* Plan */}
      <div className="bg-[#7cce20] rounded-2xl p-4 flex items-center justify-between text-white">
        <div>
          <p className="font-bold">Plano Pro (Teste)</p>
          <p className="text-sm text-white/80">7 dias restantes · Expira em 13/05/2026</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">TESTE</span>
          <button className="flex items-center gap-1.5 bg-white text-[#111] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors">
            Fazer upgrade 🚀
          </button>
        </div>
      </div>

      {/* Perfil */}
      <div className={card}>
        <p className={section}>👤 Perfil</p>
        <div className="flex items-center gap-4 mb-5 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-[#7cce20]/20 border-2 border-[#7cce20]/30 flex items-center justify-center font-bold text-[#7cce20] text-lg">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={label}>Nome</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>E-mail</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={input} />
          </div>
        </div>
        <div className="mb-4">
          <label className={label}>Senha</label>
          <input value="••••••••" type="password" readOnly className={`${input} cursor-default`} />
        </div>
        <button onClick={handleSavePerfil} className="bg-[#7cce20] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#6db81c] transition-colors">
          Salvar perfil
        </button>
      </div>

      {/* Dados MEI */}
      <div className={card}>
        <p className={section}>🏢 Dados do MEI</p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={label}>Nome do negócio</label>
            <input value={negocio} onChange={(e) => setNegocio(e.target.value)} placeholder="Ex: Maria Silva Serviços" className={input} />
          </div>
          <div>
            <label className={label}>CNPJ</label>
            <input value={cnpjVal} onChange={(e) => setCnpjVal(e.target.value)} placeholder="00.000.000/0001-00" className={input} />
          </div>
          <div>
            <label className={label}>Limite MEI anual (R$)</label>
            <input value="81000" readOnly className={`${input} bg-gray-50 cursor-default`} />
          </div>
          <div>
            <label className={label}>Ramo de atividade</label>
            <select value={ramoVal} onChange={(e) => setRamoVal(e.target.value)}
              className={`${input} bg-white`}>
              <option value="">Selecione...</option>
              <option value="servicos">Serviços</option>
              <option value="comercio">Comércio</option>
              <option value="industria">Indústria</option>
              <option value="transporte">Transporte</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className={label}>Dia de vencimento do DAS</label>
          <input value={dasDay} onChange={(e) => setDasDay(e.target.value)} type="number" min="1" max="28" className={`${input} w-32`} />
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-700 mb-0.5">Valor mensal do DAS</p>
          <p className="text-xs text-gray-400">Selecione o ramo de atividade</p>
        </div>
        <button onClick={handleSaveMei} className="bg-[#7cce20] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#6db81c] transition-colors">
          Salvar dados do MEI
        </button>
      </div>

      {/* Alertas */}
      <div className={card}>
        <p className={section}>⚠️ Alertas do limite</p>
        <p className="text-xs text-gray-400 mb-4">Receba alertas quando o faturamento anual atingir esses percentuais do limite.</p>
        <div className="space-y-3">
          {([
            { pct: 60, label: "Aviso inicial", sub: "R$ 48.600 atingidos", color: "bg-amber-100 text-amber-700", key: "a60" as const },
            { pct: 80, label: "Atenção necessária", sub: "R$ 64.800 atingidos", color: "bg-orange-100 text-orange-700", key: "a80" as const },
            { pct: 90, label: "Alerta crítico", sub: "R$ 72.900 atingidos", color: "bg-red-100 text-red-700", key: "a90" as const },
          ]).map((a) => (
            <div key={a.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.color}`}>{a.pct}%</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{a.label}</p>
                  <p className="text-xs text-gray-400">{a.sub}</p>
                </div>
              </div>
              <button
                onClick={() => setAlerts((prev) => ({ ...prev, [a.key]: !prev[a.key] }))}
                className={`relative w-11 h-6 rounded-full transition-colors ${alerts[a.key] ? "bg-[#7cce20]" : "bg-gray-200"}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${alerts[a.key] ? "left-6" : "left-1"}`} />
              </button>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-[#7cce20] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#6db81c] transition-colors">
          Salvar alertas
        </button>
      </div>

      {/* Notificações */}
      <div className={card}>
        <p className={section}>🔔 Notificações <span className="font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md text-[9px]">PRO</span></p>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Notificações por WhatsApp e E-mail</p>
            <p className="text-xs text-gray-400 mt-0.5">Receba os alertas de limite diretamente no seu celular ou caixa de entrada. Disponível no plano Pro.</p>
          </div>
          <button className="text-xs font-semibold bg-[#7cce20] text-white px-3 py-1.5 rounded-lg hover:bg-[#6db81c] transition-colors whitespace-nowrap ml-4">
            🔓 Desbloquear grátis
          </button>
        </div>
      </div>

      {/* Conta & Suporte */}
      <div className={card}>
        <p className={section}>🔐 Conta</p>
        <div className="divide-y divide-gray-100">
          {[
            { label: "Exportar dados", sub: "Baixar todos os seus lançamentos em CSV", action: "Exportar CSV" },
            { label: "Sessão atual", sub: "Encerrar esta sessão e voltar à tela inicial", action: "Sair da conta" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
              <button className="text-xs font-medium border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={card}>
        <p className={section}>💬 Suporte</p>
        <div className="divide-y divide-gray-100">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">WhatsApp</p>
              <p className="text-xs text-gray-400">Atendimento rápido pelo WhatsApp</p>
            </div>
            <button className="text-xs font-semibold bg-[#7cce20] text-white px-4 py-1.5 rounded-lg hover:bg-[#6db81c] transition-colors">Chamar</button>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">E-mail</p>
              <p className="text-xs text-gray-400">contato@e-mei.com.br</p>
            </div>
            <button className="text-xs font-medium border border-gray-200 px-4 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">Enviar</button>
          </div>
        </div>
      </div>

      {/* Zona de perigo */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-5">
        <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-4">⚠️ Zona de perigo</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-red-600">Apagar todos os dados</p>
            <p className="text-xs text-gray-400">Remove todos os lançamentos e categorias. Irreversível.</p>
          </div>
          <button className="text-xs font-semibold bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors">
            Apagar tudo
          </button>
        </div>
      </div>
    </div>
  );
}
