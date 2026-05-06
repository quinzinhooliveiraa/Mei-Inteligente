# e-mei — MEI inteligente

Landing page para o produto e-mei, plataforma de gestão inteligente para Microempreendedores Individuais (MEI) brasileiros.

## Run & Operate

- `pnpm --filter @workspace/e-mei run dev` — rodar o site (porta via $PORT)
- `pnpm run typecheck` — typecheck completo
- `pnpm run build` — build completo

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (react-vite artifact)
- Animações: Framer Motion
- Ícones: Lucide React
- Fonte: Outfit (Google Fonts)
- Build: Vite + Tailwind CSS v4

## Where things live

- `artifacts/e-mei/src/App.tsx` — componente principal da landing page (única página)
- `artifacts/e-mei/src/index.css` — tema dark com variáveis CSS (#222121 base, #7cce20 accent)
- `attached_assets/` — imagem hero gerada por IA

## Architecture decisions

- Site estático (presentation-first), sem backend ou banco de dados
- Single-page app com scroll suave entre seções
- Dark theme fixo baseado nas cores da marca (#222121 fundo, #7cce20 verde, #fff texto)
- Framer Motion para animações de scroll-reveal e micro-interações

## Product

Landing page da e-mei com seções: Hero, Funcionalidades, Como funciona, Planos (Grátis + Pro R$29,90/mês), Depoimentos, FAQ, CTA Final, Rodapé.

## User preferences

- Nome do produto: e-mei
- Slogan: MEI inteligente
- Cores: #222121 (base/fundo), #7cce20 (verde/destaque), #ffffff (texto)
- Verde NÃO é a cor base — o preto/escuro é
- Todo conteúdo em português brasileiro

## Gotchas

- Google Fonts @import deve ser a PRIMEIRA linha do index.css (antes dos imports do Tailwind)
- Site é estático — não requer DATABASE_URL nem API server

## Pointers

- See the `pnpm-workspace` skill for workspace structure
- See the `react-vite` skill for frontend conventions
