# landingbase

Base **Astro estática** (zero JS por padrão, CSS crítico inlined) para criar landing pages
com nota máxima de Lighthouse. Cada novo projeto parte deste repo.

## Ao criar/dirigir uma landing page neste repositório

Consulte a inteligência em [`intelligence/`](intelligence/README.md) **antes de construir**:

1. Assuma o [`system-prompt`](intelligence/system-prompt.md).
2. Siga o [`pipeline`](intelligence/pipeline.md): briefing → direção criativa → copy → build → QA.
3. Não entregue sem passar pelo [portão de qualidade](intelligence/reference/quality-checklist.md).

`intelligence/` é referência (markdown) e **não faz parte do build** — o Astro só compila `src/`.

## Estrutura

- `src/` — app Astro (páginas, layout, estilos). É o que vira o site.
- `intelligence/` — prompts/instruções de IA para criar landing pages. Independente do build.
- `vercel.json` — deploy estático no Vercel (`framework: astro`, output `dist/`).

## Comandos

`npm run dev` (dev `:4321`) · `npm run build` (estático em `dist/`) · `npm run preview`.
