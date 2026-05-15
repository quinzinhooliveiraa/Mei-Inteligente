import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "./hooks/useSEO";

export default function TermosPage() {
  const [, setLocation] = useLocation();

  useSEO({
    title: "Termos de Uso — EasyMei",
    description: "Leia os Termos de Uso da EasyMei: regras de utilização da plataforma, planos, responsabilidades e legislação aplicável.",
    canonical: "/termos",
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
          <span className="text-sm text-muted-foreground">Termos de Uso</span>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-light tracking-wide mb-4">
          Termos de <span className="text-primary">Uso</span>
        </h1>
        <p className="text-muted-foreground mb-12 text-sm">Última atualização: maio de 2026</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou utilizar os serviços da <strong className="text-foreground">EasyMei</strong> ("nós", "nosso"), você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">2. Descrição do Serviço</h2>
            <p>
              A EasyMei oferece serviços de gestão burocrática para Microempreendedores Individuais (MEI), incluindo pagamento do DAS, emissão de notas fiscais, envio da declaração anual (DASN-SIMEI) e acompanhamento da situação do CNPJ.
            </p>
            <p className="mt-2">
              Nossos serviços são prestados por profissionais especializados em gestão de MEI, não constituindo consultoria jurídica, contábil ou fiscal licenciada. Para questões específicas que demandem parecer técnico formal, recomendamos consulta a profissional habilitado.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">3. Cadastro e Responsabilidade do Usuário</h2>
            <p>O usuário é responsável por:</p>
            <ul className="list-disc list-inside mt-2 space-y-1.5">
              <li>Fornecer informações verdadeiras, completas e atualizadas no cadastro;</li>
              <li>Manter sigilo sobre suas credenciais de acesso;</li>
              <li>Notificar a EasyMei imediatamente sobre qualquer uso não autorizado de sua conta;</li>
              <li>Cumprir com as obrigações legais do MEI independentemente dos serviços contratados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">4. Planos e Pagamentos</h2>
            <p>
              A EasyMei oferece plano gratuito com funcionalidades básicas e plano Pro mediante assinatura mensal no valor de R$ 29,90. Os valores podem ser alterados mediante aviso prévio de 30 (trinta) dias.
            </p>
            <p className="mt-2">
              O cancelamento do plano pode ser realizado a qualquer momento. Não haverá reembolso proporcional de valores já cobrados pelo período vigente.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">5. Limitação de Responsabilidade</h2>
            <p>
              A EasyMei não se responsabiliza por prejuízos decorrentes de informações incorretas fornecidas pelo usuário, indisponibilidade dos sistemas do governo (Portal do Empreendedor, Receita Federal, PGMEI), ou mudanças na legislação vigente.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">6. Propriedade Intelectual</h2>
            <p>
              Todos os conteúdos, marcas, logotipos e materiais presentes no site e no aplicativo são de propriedade exclusiva da EasyMei e protegidos pela legislação de propriedade intelectual brasileira.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">7. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. Alterações relevantes serão comunicadas por e-mail ou notificação no aplicativo. O uso continuado dos serviços após a notificação constitui aceitação das mudanças.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">8. Legislação Aplicável</h2>
            <p>
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Governador Valadares/MG para dirimir quaisquer controvérsias.
            </p>
          </section>

          <section>
            <h2 className="text-foreground font-semibold text-base mb-3">9. Contato</h2>
            <p>
              Dúvidas sobre estes Termos podem ser enviadas para{" "}
              <a href="https://wa.me/553391240627" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                nosso WhatsApp
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
            onClick={() => setLocation("/privacidade")}
            className="text-sm text-primary hover:underline"
          >
            Ver Política de Privacidade →
          </button>
        </div>
      </main>
    </div>
  );
}
