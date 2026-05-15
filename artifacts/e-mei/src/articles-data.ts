export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured: boolean;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: "o-que-e-das-mei",
    title: "O que é o DAS e quando você precisa pagar?",
    excerpt: "O DAS (Documento de Arrecadação do Simples Nacional) é a guia mensal obrigatória do MEI. Entenda os valores, os prazos e o que acontece se atrasar.",
    category: "DAS & Impostos",
    readTime: "4 min",
    date: "10 Mai 2026",
    featured: true,
    content: `
## O que é o DAS?

O **DAS (Documento de Arrecadação do Simples Nacional)** é a guia mensal que todo MEI precisa pagar para estar em dia com o governo. Ele reúne em um único boleto três contribuições:

- **INSS** (Previdência Social): garante seus direitos como aposentadoria, auxílio-doença e salário-maternidade
- **ISS** (Imposto Sobre Serviços): pago por quem presta serviços
- **ICMS** (Imposto sobre Circulação de Mercadorias): pago por quem vende produtos

## Quanto custa o DAS em 2025?

O valor do DAS é fixo e calculado com base no salário mínimo vigente:

| Tipo de atividade | Valor mensal |
|---|---|
| Comércio e indústria | R$ 71,60 |
| Prestação de serviços | R$ 75,60 |
| Comércio + serviços | R$ 76,60 |

> **Importante:** Esses valores são atualizados sempre que o salário mínimo muda.

## Quando pagar?

O DAS vence todo mês no **dia 20**. Se o dia 20 cair em fim de semana ou feriado, o vencimento passa para o próximo dia útil.

Exemplo: se hoje é dia 5 de maio, você tem até o dia 20 de maio para pagar o DAS referente a maio.

## O que acontece se eu atrasar?

Atrasar o DAS gera multa e juros automáticos:

- **Multa:** 0,33% ao dia, limitada a 20% do valor
- **Juros:** baseados na taxa Selic do período

Além disso, seu CNPJ pode ficar irregular, o que impede emissão de certidões negativas e pode bloquear contratos com empresas que exigem CNPJ ativo.

## Como emitir o DAS?

Você pode emitir o DAS gratuitamente pelo **Portal do Empreendedor** (gov.br/mei) ou pelo app do MEI. Acesse, informe seu CPF e gere a guia do mês que deseja pagar.

Com a EasyMei, você não precisa se preocupar com nada disso. A gente emite e acompanha o pagamento do seu DAS todo mês por você.
    `.trim(),
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
    content: `
## Qual é o limite de faturamento do MEI?

Em 2025, o MEI pode faturar até **R$ 130.500 por ano**, o equivalente a R$ 10.875 por mês em média.

Esse limite foi atualizado com a Lei Complementar nº 204/2023, que trouxe também uma novidade importante: o **MEI Caminhoneiro**, com teto de R$ 251.600 anuais.

## Como o limite é calculado na prática?

O limite é anual, não mensal. Isso significa que você pode faturar mais em um mês e menos em outro. O que importa é o total no ano.

**Exemplo:**
- Janeiro: R$ 5.000
- Fevereiro: R$ 8.000
- Março: R$ 12.000
- *(e assim por diante...)*
- **Total anual: deve ficar abaixo de R$ 130.500**

## O que acontece se eu ultrapassar o limite?

Se você ultrapassar o limite em até 20% (ou seja, faturar até R$ 156.600), será desenquadrado do MEI apenas no **ano seguinte**, passando para o Simples Nacional como Microempresa (ME).

Se ultrapassar em mais de 20%, o desenquadramento é **retroativo ao mês em que ultrapassou**, com recolhimento de impostos diferenciados desde aquele período.

## Como acompanhar meu faturamento?

As melhores práticas são:

1. **Anote todas as entradas**: não só notas fiscais, mas qualquer valor recebido pelo negócio
2. **Some mês a mês** e compare com o acumulado do ano
3. **Projete o restante do ano** para saber se está no caminho certo

## Dica prática

Se você está chegando perto do limite no segundo semestre, avalie com antecedência se faz sentido migrar para ME. Planejar antes é sempre melhor do que ser pego de surpresa.

Com a EasyMei, você acompanha seu faturamento acumulado em tempo real, com alertas quando estiver se aproximando do limite.
    `.trim(),
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
    content: `
## O que é a DASN-SIMEI?

A **DASN-SIMEI** (Declaração Anual do Simples Nacional para o MEI) é a obrigação anual de informar à Receita Federal quanto você faturou no ano anterior e se teve algum funcionário.

É diferente do DAS (que é mensal): a DASN é feita uma vez por ano e serve para o governo "fechar as contas" do seu MEI no exercício anterior.

## Prazo de entrega

A DASN deve ser entregue até **31 de maio** de cada ano, referente ao ano anterior.

Exemplo: até 31 de maio de 2025, você entrega a DASN com os dados de 2024.

## Quem precisa entregar?

**Todo MEI** precisa entregar a DASN, mesmo que não tenha faturado nada no ano. Nesse caso, você declara faturamento zero.

## O que informar na DASN?

A declaração é simples e pede apenas:

- **Receita bruta total** do ano (soma de tudo que você recebeu)
- **Receita de comércio** (se vende produtos)
- **Receita de serviços** (se presta serviços)
- **Se teve empregado** no ano declarado

Não é preciso apresentar notas fiscais ou comprovantes. Você apenas informa os valores.

## Como fazer a DASN?

1. Acesse o **Portal do Empreendedor** (gov.br/mei)
2. Clique em "Declaração Anual de Faturamento (DASN-SIMEI)"
3. Informe seu CPF e acesse com sua conta gov.br
4. Preencha os dados de faturamento e envie

O processo leva menos de 5 minutos se você tiver os valores do faturamento em mãos.

## O que acontece se não entregar?

A multa mínima por atraso na DASN é de **R$ 50,00**. Após 30 dias em atraso, a multa dobra para R$ 100,00.

Além da multa, o CNPJ pode ficar irregular, impedindo emissão de certidões e outros documentos.

## Como regularizar se estiver em atraso?

Você pode entregar a DASN com atraso a qualquer momento pelo mesmo portal. A multa é gerada automaticamente e pode ser paga via DAS. Não há outro processo: basta fazer a entrega e pagar a multa gerada.

Com a EasyMei, a gente cuida do envio da sua DASN antes do prazo, sem você precisar lembrar de nada.
    `.trim(),
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
    content: `
## MEI pode emitir nota fiscal?

Sim! O MEI **pode e deve** emitir nota fiscal quando necessário. Mas há regras sobre quando é obrigatório e quando é opcional.

## Quando é obrigatório emitir NF?

A emissão de nota fiscal é **obrigatória** quando o comprador é uma **pessoa jurídica (empresa)**. Isso vale tanto para vendas de produtos quanto para prestação de serviços.

Quando o cliente é uma **pessoa física**, a nota fiscal é opcional — mas pode ser solicitada pelo cliente, e nesse caso você deve emitir.

## Tipos de nota fiscal para MEI

Existem dois tipos principais:

**NFS-e (Nota Fiscal de Serviços Eletrônica)**
- Para quem presta serviços
- Emitida pela prefeitura do seu município
- Cada cidade tem seu próprio sistema

**NF-e (Nota Fiscal Eletrônica)**
- Para quem vende produtos (comércio e indústria)
- Emitida pelo sistema da Sefaz do estado
- Exige certificado digital em alguns casos

## Como emitir a NFS-e (serviços)?

1. Acesse o site da prefeitura da sua cidade (busque por "NFS-e + nome da cidade")
2. Cadastre-se com seu CNPJ
3. Preencha os dados do serviço e do tomador (cliente)
4. Emita e envie ao cliente

## Como emitir NF-e (produtos)?

Para produtos, o processo pode ser mais complexo. Você pode usar:
- O portal da Sefaz do seu estado (gratuito)
- Aplicativos como o **EmissorNF** do governo
- Plataformas especializadas

## Dicas importantes

- **Guarde as notas** emitidas para informar corretamente na DASN anual
- **Não deixe de emitir** quando solicitado. A omissão pode gerar multas
- O valor da nota **não gera cobrança extra** de impostos para o MEI, pois o DAS já cobre tudo

Com a EasyMei, emitimos as notas fiscais pelo seu MEI sempre que você precisar, para pessoa física ou jurídica.
    `.trim(),
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
    content: `
## O que significa CNPJ irregular?

Ter o CNPJ irregular significa que seu MEI está com alguma pendência junto ao governo. Isso pode acontecer por vários motivos e tem consequências sérias para o seu negócio.

## Principais causas de irregularidade

**1. DAS em atraso**
É a causa mais comum. Qualquer mês sem pagamento gera irregularidade e acumula multa e juros.

**2. DASN não entregue**
Se você não enviou a declaração anual dentro do prazo (31 de maio), o CNPJ fica com pendência de obrigação acessória.

**3. Dados desatualizados**
Mudança de endereço, atividade ou informações de contato sem atualização no Portal do Empreendedor.

**4. Excesso de faturamento**
Se você ultrapassou o limite do MEI sem se regularizar como ME, o CNPJ pode ser cancelado retroativamente.

## Como verificar a situação do seu CNPJ?

Você pode consultar gratuitamente:

1. **Receita Federal**: acesse [servicos.receita.fazenda.gov.br](https://servicos.receita.fazenda.gov.br) e busque por "Comprovante de Inscrição"
2. **Portal do Empreendedor**: faça login e verifique as pendências na sua área
3. **PGMEI**: para verificar DAS em aberto

O status aparecerá como **Ativo**, **Suspenso**, **Baixado** ou **Inapto**.

## Como regularizar?

**DAS em atraso:**
Gere as guias em atraso no PGMEI (pgmei.fazenda.gov.br), pague com multa e juros já incluídos automaticamente.

**DASN em atraso:**
Acesse o Portal do Empreendedor, entregue a declaração e pague a multa gerada (a partir de R$ 50).

**Dados desatualizados:**
Acesse o Portal do Empreendedor, vá em "Alterar dados cadastrais" e atualize as informações.

## Qual o prazo para regularizar?

Não existe um prazo fixo para regularizar voluntariamente. Você pode fazer a qualquer momento, mas MEIs com CNPJ irregular por mais de 12 meses podem ter o CNPJ cancelado de ofício pela Receita Federal.

Com a EasyMei, monitoramos a situação do seu CNPJ continuamente e resolvemos qualquer pendência antes que vire problema.
    `.trim(),
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
    content: `
## Por que o controle financeiro é tão importante?

Muitos MEIs trabalham muito, mas no final do mês não sabem dizer se lucraram ou não. Isso acontece porque **mistura-se o dinheiro pessoal com o do negócio** e não se registra o que entra e sai.

Sem controle, você não consegue:
- Saber se o negócio é lucrativo
- Planejar investimentos
- Acompanhar o faturamento para não ultrapassar o limite do MEI
- Ter previsão de quanto vai sobrar no mês

## Passo 1: Separe conta pessoal da do negócio

O primeiro passo é abrir uma **conta bancária separada para o MEI**. Muitos bancos oferecem conta PJ gratuita para MEI (Nubank, Banco do Brasil, Caixa, Inter, etc.).

Tudo que entrar no negócio vai para essa conta. Tudo que for pessoal fica na conta pessoal. Simples assim.

## Passo 2: Registre todas as entradas

Toda vez que receber um pagamento, anote:
- **Data** do recebimento
- **Valor** recebido
- **Cliente** ou origem
- **Descrição** do serviço ou produto

Você pode usar uma planilha, um caderno ou um aplicativo. O importante é fazer isso **no mesmo dia**.

## Passo 3: Registre todas as saídas

Anote também tudo que você gasta no negócio:
- Materiais e insumos
- Ferramentas e equipamentos
- Marketing e publicidade
- DAS mensal
- Transporte relacionado ao negócio

## Passo 4: Calcule seu lucro mensalmente

No fim de cada mês, faça o cálculo simples:

**Lucro = Total de entradas − Total de saídas**

Se o resultado for positivo, você lucrou. Se for negativo, você teve prejuízo. Vale entender o porquê.

## Ferramentas úteis

- **Google Sheets / Excel**: planilha simples e gratuita
- **Notion ou Trello**: para organizar além das finanças
- **MEI Fácil, Conta Azul Free**: apps especializados
- **EasyMei**: acompanhamento do faturamento integrado à gestão do seu MEI

## Dica de ouro

Faça o fechamento financeiro **todo último dia do mês**, sem falta. Reserve 30 minutos, some tudo e anote o resultado. Com o tempo, você vai perceber padrões e tomar decisões melhores para o seu negócio.
    `.trim(),
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
    content: `
## MEI pode ter funcionário?

Sim! O MEI pode contratar **até 1 (um) empregado**. Essa possibilidade existe desde a criação do MEI e é uma das vantagens da categoria.

## Qual salário pagar?

O salário do funcionário do MEI deve ser de no mínimo **1 salário mínimo** ou o **piso da categoria** (o que for maior, conforme convenção coletiva da atividade).

Em 2025, o salário mínimo é de **R$ 1.518,00**.

## Quais encargos o MEI paga?

Como empregador, o MEI deve recolher:

| Encargo | Percentual | Responsabilidade |
|---|---|---|
| FGTS | 8% do salário | Empregador |
| INSS Patronal | 3% do salário | Empregador |
| INSS do funcionário | 7,5% a 14% | Descontado do salário |

O INSS do funcionário é descontado do salário dele e repassado pelo MEI. O FGTS e o INSS patronal são custos adicionais do MEI.

## Como contratar o funcionário?

1. **Registre o empregado** em Carteira de Trabalho (física ou digital, via app CTPS Digital)
2. **Cadastre-se no eSocial** (esocial.gov.br), obrigatório para quem tem empregado
3. **Faça o recolhimento** do FGTS mensalmente via FGTS Digital
4. **Recolha o INSS** via GPS (Guia da Previdência Social) mensalmente

## Obrigações mensais com funcionário

- Pagar o salário até o **5º dia útil** do mês seguinte
- Recolher o **FGTS** até o dia 7 do mês seguinte
- Recolher o **INSS** até o dia 20 do mês seguinte
- Enviar eventos no **eSocial**

## Direitos do funcionário do MEI

O funcionário do MEI tem todos os direitos trabalhistas normais:
- 13º salário
- Férias + 1/3
- FGTS
- Aviso prévio
- Rescisão conforme CLT

## Vale a pena contratar?

Avalie se o custo total (salário + encargos ≈ 40% a mais sobre o salário) cabe no seu faturamento. Se você fatura próximo ao limite do MEI, contratar um funcionário pode pressionar suas despesas. Nesse caso, pode ser hora de migrar para ME.
    `.trim(),
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
    content: `
## O MEI tem cobertura previdenciária?

Sim! Ao pagar o DAS mensalmente, o MEI contribui automaticamente para o INSS. Isso garante acesso a uma série de benefícios previdenciários.

A contribuição previdenciária do MEI corresponde a **5% do salário mínimo**. Em 2025, são cerca de R$ 75,90 por mês, já incluídos no valor do DAS.

## Quais benefícios o MEI tem direito?

### 1. Aposentadoria por Idade
- **Homens:** 65 anos + mínimo de 180 meses de contribuição (15 anos)
- **Mulheres:** 62 anos + mínimo de 180 meses de contribuição (15 anos)
- **Valor:** 1 salário mínimo (por contribuir com apenas 5%)

### 2. Aposentadoria por Invalidez
- Para quem fica permanentemente incapaz de trabalhar
- Exige **12 meses** de contribuição prévia (carência)
- **Valor:** 1 salário mínimo

### 3. Auxílio por Incapacidade Temporária (antigo auxílio-doença)
- Para afastamentos temporários por doença ou acidente
- Exige **12 meses** de contribuição prévia
- Afastamentos por acidente de trabalho não têm carência
- **Valor:** 1 salário mínimo

### 4. Salário-Maternidade
- Para MEI mulher que der à luz, adotar ou tiver guarda judicial de criança
- Exige **10 meses** de contribuição prévia
- Duração: **120 dias** (parto), **60 dias** (aborto espontâneo)
- **Valor:** 1 salário mínimo por mês

### 5. Pensão por Morte e Auxílio-Reclusão
- Para dependentes do MEI em caso de morte ou reclusão
- Exige contribuição prévia mínima (12 a 24 meses, dependendo do caso)
- **Valor:** baseado em percentual do benefício do segurado

## O que o MEI NÃO tem com 5%?

Contribuindo com apenas 5%, o MEI **não tem direito à aposentadoria por tempo de contribuição** (aquela que conta os anos trabalhados independente da idade).

Para ter esse direito, é necessário complementar a contribuição para 20% do salário mínimo. Consulte o INSS para mais detalhes.

## Dica importante

Mantenha o DAS em dia sem interrupções. Meses sem pagamento podem quebrar a carência necessária para acessar os benefícios, e você precisaria recomeçar a contagem.

Com a EasyMei, seu DAS é pago em dia todo mês, garantindo sua cobertura previdenciária sem interrupções.
    `.trim(),
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  "DAS & Impostos": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Faturamento": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Declaração": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Nota Fiscal": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Regularização": "bg-red-500/10 text-red-400 border-red-500/20",
  "Finanças": "bg-green-500/10 text-green-400 border-green-500/20",
  "Gestão": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Benefícios": "bg-pink-500/10 text-pink-400 border-pink-500/20",
};
