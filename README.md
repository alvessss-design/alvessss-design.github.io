# KARU — portfólio

Portfólio estático em Astro, com homes `/pt` e `/en` e três cases bilíngues. O projeto mantém a estrutura original de Astro e a configuração de Vercel. Astro foi atualizado para 7.3.2 para resolver alertas das dependências iniciais.

## Desenvolvimento e validação

- `npm install`
- `npm run dev` — prévia local
- `npm run check` — tipos e componentes Astro
- `npm run lint` — ESLint
- `npm run build` — site estático em `dist/`
- `npm test` — tipos, lint, build e integridade das oito páginas bilíngues
- `npm run preview` — prévia da versão compilada

## Substituir conteúdo

- `src/data/content.ts`: traduções da home, biografia, e-mail, WhatsApp (apenas dígitos com código do país), redes, retrato e mídia da Hero.
- `src/data/projects.ts`: nomes, descrições, decisões, créditos, imagens e vídeo de cada case.
- `public/images/`: imagens WebP em duas resoluções (720 e 1672 px).
- `.env.example`: domínio e liberação de indexação. Definir `PUBLIC_SITE_URL` e `PUBLIC_INDEXABLE=true` somente após substituir o conteúdo demonstrativo e recompilar.

As rotas de projeto usam o mesmo slug nos dois idiomas para tornar a correspondência inequívoca. São URLs reais, sem modal. O histórico nativo conserva o retorno; o link explícito usa a posição guardada na sessão quando disponível, com âncora de fallback.

## Conteúdo demonstrativo

Synthetic Memory, Chromatic Silence e Future Rituals são estudos gerados para demonstrar o portfólio, sem clientes reais. A biografia é provisória, o retrato é uma composição abstrata e a disponibilidade está por definir. `hello@karu.example` é propositalmente um endereço de exemplo. WhatsApp e redes ficam identificados como “Em breve” até haver dados reais, sem links fictícios acionáveis. Não há currículo nem formulário.

A Hero usa uma imagem original com movimento discreto de enquadramento, pausável, e não um arquivo de reel. Os campos `video` estão prontos para receber mídia real. O componente de vídeo oferece poster, reprodução muda, playsinline e controles, e pausa fora da tela. Vídeos com conteúdo falado precisarão de legendas reais.

## Direção e referências

- Elaps: enquadramentos grandes, tipografia/legendas editoriais, ritmo de mídia. Fundo revisto para `#080808`, medido no site.
- Marioo: grade direta, função sempre visível, contraste retrato/texto e contato sem formulário. A navegação e a grade agora usam limites centrais equivalentes aos respiros observados nas referências.
- Cipher: navegação compacta e caracteres em espaços estáveis. A implementação original usa slots por caractere, atualização a cada 32 ms e resolução progressiva em cerca de 400 ms, sem alterar o nome acessível. Não copiamos scripts da referência. A correspondência temporal exata do hover não pôde ser medida pelo navegador de inspeção; não se afirma reprodução pixel a pixel.
- Haoqi/aDrive: leitura textual de subtítulos e decisões acompanhadas por imagens. A renderização visual ficou incompleta no navegador de inspeção.
- Meinhard Taxer: curadoria de obras observada no DOM; a captura visual inicial não terminou de carregar. Não copiamos loja, newsletter ou filtros.
- Richard Mattka: navegação observada no DOM, mas transições não confirmadas; não atribuídas à implementação.

Foram lidos o prompt de implementação, a proposta de estrutura v02, README, CLAUDE e Base portfolio.txt. A pasta intelligence, o documento de direção v01 e o PDF Human Academy não estavam no workspace.

## Header atualizado conforme feedback

KARU de 41 px no desktop e 35 px no mobile; navegação lateral de 13 px e caixa alta. Como a Favorit Medium do Cipher é comercial, a reprodução local usa Inter Variable em peso 650, kerning fechado e a mesma altura de linha para alcançar o mesmo peso e desenho compacto sem depender de uma fonte ausente. Os links laterais seguem exatamente as margens do conteúdo de 1660 px. Superfície transparente, sem borda, divisória ou sublinhado ativo. O header usa `mix-blend-mode: difference`, produzindo contraste contínuo por pixel sobre fundos claros, escuros e suas transições. Ao descer mais de 24 px acumulados, ficam só a marca; ao subir 10 px, os links retornam com transição de opacidade e posição. Foco de teclado também revela a navegação. No mobile, dialog com Escape, bloqueio de scroll, retorno e contenção de foco.

Em telas largas, a navegação e as áreas principais ficam centralizadas em até 1660 px. A hero usa até 586 px de altura e mantém o espaço superior observado no Elaps. Os rótulos editoriais acima da imagem e o link redundante abaixo dela foram removidos para dar prioridade à imagem e à apresentação principal.

A hero agora usa uma composição enquadrada por linhas técnicas e marcas de canto, com quadro externo de até 2060 px e mídia interna próxima de 1660 px em telas amplas. A headline avança além da borda esquerda da imagem, e a altura de 736 px mantém o início dos trabalhos fora da primeira dobra. O controle de pausa e a descrição inferior foram removidos. O poster é um visual autoral noturno, separado dos três trabalhos, preparado para ser substituído pelo vídeo final sem alterar o layout.

## Mídias e licenças

Três visuais criados com a ferramenta nativa de geração de imagens; nenhum asset foi extraído das referências. Prompts em `docs/image-prompts.md`. Fontes Manrope e Inter distribuídas localmente por Fontsource, sob SIL Open Font License; licenças preservadas nos pacotes instalados.

## Verificação

Tipos, lint, build e integridade de rotas passaram. Auditoria npm após atualização: zero vulnerabilidades. Inspeção real de desktop e mobile, imagens carregadas, painel e Escape, ciclo de foco, recolhimento/retorno do header, contraste por blend e idioma equivalente em case. Medidas de 320, 390, 430, 768, 1366, 1920 e 2535 px verificadas sem overflow pelo DOM. Capturas em `output/qa/`.

A redução de movimento está implementada em CSS e JS; a emulação da preferência do sistema e o throttling de rede não estão expostos pelo navegador disponível. Não foi executado Lighthouse, nem validado desempenho com um reel final ainda inexistente. As capturas intermediárias de redimensionamento podem refletir o recorte da janela do aplicativo; usar `desktop.png` e `mobile.png` como evidência principal.
