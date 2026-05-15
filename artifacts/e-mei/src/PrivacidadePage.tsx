import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "./hooks/useSEO";

export default function PrivacidadePage() {
  const [, setLocation] = useLocation();

  useSEO({
    title: "Política de Privacidade — EasyMei",
    description: "Saiba como a EasyMei coleta, usa e protege seus dados pessoais, em conformidade com a LGPD (Lei nº 13.709/2018).",
    canonical: "/privacidade",
    noIndex: false,
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <img src="/logo.png" alt="EasyMei" className="h-8 w-auto" />
          </button>
          <span className="text-sm text-muted-foreground">Política de Privacidade</span>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-light tracking-wide mb-4">
          Política de <span className="text-primary">Privacidade</span>
        </h1>
        <p className="text-muted-foreground mb-12 text-sm">Última atualização: maio de 2026</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">1. Quem somos</h2>
            <p>
              A <strong className="text-foreground">EasyMei</strong> é uma plataforma de gestão burocrática para Microempreendedores Individuais (MEI), comprometida com a transparência e a proteção dos dados pessoais de seus usuários, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">2. Dados que coletamos</h2>
            <p>Coletamos os seguintes dados ao utilizar nossos serviços:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li><strong className="text-foreground">Dados cadastrais:</strong> nome completo, CPF, e-mail e telefone;</li>
              <li><strong className="text-foreground">Dados do MEI:</strong> CNPJ, razão social, atividade econômica (CNAE) e endereço comercial;</li>
              <li><strong className="text-foreground">Dados financeiros:</strong> informações de faturamento mensais informadas pelo usuário;</li>
              <li><strong className="text-foreground">Dados de uso:</strong> páginas acessadas, tempo de sessão e interações com a plataforma;</li>
              <li><strong className="text-foreground">Dados técnicos:</strong> endereço IP, tipo de navegador e sistema operacional.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">3. Como usamos seus dados</h2>
            <p>Seus dados são utilizados para:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li>Prestar os serviços contratados (pagamento de DAS, emissão de NF, DASN);</li>
              <li>Comunicar alertas e lembretes sobre obrigações do seu MEI;</li>
              <li>Personalizar sua experiência na plataforma;</li>
              <li>Cumprir obrigações legais e regulatórias;</li>
              <li>Melhorar continuamente nossos produtos e serviços.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">4. Compartilhamento de dados</h2>
            <p>
              Não vendemos nem alugamos seus dados a terceiros. Podemos compartilhar informações com:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li>Órgãos governamentais (Receita Federal, Portal do Empreendedor), quando necessário para a prestação do serviço;</li>
              <li>Parceiros de tecnologia que operam sob contratos de confidencialidade e tratam dados somente conforme nossas instruções;</li>
              <li>Autoridades, quando exigido por lei ou ordem judicial.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">5. Cookies e rastreamento</h2>
            <p>
              Utilizamos cookies essenciais para o funcionamento da plataforma e cookies analíticos para entender como os usuários interagem com o site. Você pode desabilitar cookies no seu navegador, mas isso pode afetar o funcionamento de algumas funcionalidades.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">6. Segurança dos dados</h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou destruição, incluindo criptografia em trânsito (HTTPS) e controle de acesso baseado em função.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">7. Seus direitos (LGPD)</h2>
            <p>Como titular de dados, você tem direito a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos seus dados;</li>
              <li>Correção de dados incompletos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados;</li>
              <li>Revogação do consentimento a qualquer momento.</li>
            </ul>
            <p className="mt-2">
              Para exercer qualquer desses direitos, entre em contato pelo{" "}
              <a href="https://wa.me/553391240627" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">8. Retenção de dados</h2>
            <p>
              Mantemos seus dados pelo tempo necessário à prestação dos serviços e pelo prazo legal aplicável. Após o encerramento da conta, os dados são excluídos ou anonimizados em até 90 dias, salvo obrigação legal de retenção.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">9. Alterações nesta Política</h2>
            <p>
              Esta Política pode ser atualizada periodicamente. Notificaremos sobre mudanças relevantes via e-mail ou aviso na plataforma. Recomendamos revisão periódica.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">10. Contato</h2>
            <p>
              Para dúvidas sobre esta Política ou sobre o tratamento dos seus dados, fale conosco pelo{" "}
              <a href="https://wa.me/553391240627" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </a>{" "}
              ou pelo Instagram{" "}
              <a href="https://www.instagram.com/easy.mei/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                @easy.mei
              </a>.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex gap-4">
          <button
            onClick={() => setLocation("/termos")}
            className="text-sm text-primary hover:underline"
          >
            Ver Termos de Uso →
          </button>
        </div>
      </main>
    </div>
  );
}
