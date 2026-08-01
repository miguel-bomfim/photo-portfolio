# Sarah — portfólio de fotografia

Portfólio estático criado em Astro, inspirado no ritmo editorial do
DesignPhotographyPortfolio. O site não usa React nem bibliotecas de UI: o
JavaScript entregue ao navegador cuida apenas dos filtros, tema, lightbox e
reorganização da galeria.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Hygraph

O build busca automaticamente o conteúdo publicado no projeto Hygraph:

```text
https://sa-east-1.cdn.hygraph.com/content/cl70fxxzg1fwv01t83najbw7a/master
```

Você pode substituir o endpoint ou fornecer um token em ambientes privados:

```bash
HYGRAPH_ENDPOINT=https://...
HYGRAPH_TOKEN=...
```

Os modelos utilizados são `HomePage`, `Portfolio`, `AboutMe` e `Asset`. O
conteúdo é buscado durante o build, portanto uma nova publicação no Hygraph
entra no site na próxima implantação da Vercel.

### Organização das páginas

- `/`: usa somente as imagens selecionadas em `HomePage.portfolioThumbnail`.
- `/trabalhos`: mostra uma capa por entrada de `Portfolio`.
- `/trabalhos/[slug]`: mostra todas as imagens do campo `Portfolio.photos`.

## Personalização

- Marca, textos, e-mail e links: `src/pages/index.astro`
- Consulta e fallback do Hygraph: `src/lib/hygraph.ts`
- Cores, fontes e espaçamentos-base: variáveis em `src/styles/global.css`
- Layout de cada tela: bloco `<style>` da própria página em `src/pages`
- Cabeçalho e galeria: estilos locais em `SiteLayout.astro` e
  `PhotoGallery.astro`

O `global.css` deve continuar restrito a tokens visuais, reset, tema e pequenas
utilidades realmente compartilhadas. Estilos específicos ficam junto da página
ou do componente que controlam, aproveitando o escopo automático do Astro.

Atualize o e-mail e os links sociais em `src/pages/index.astro` antes da
publicação.
