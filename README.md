# wp-headless-nextjs

Front-end desacoplado (headless), consumindo a REST API nativa do WordPress, construído com Next.js e TypeScript.

## Por que este projeto existe

Combina duas competências que já aplico separadamente há anos, WordPress e Next.js, na configuração específica que faltava demonstrar no portfólio: o WordPress atuando como CMS headless, com o front-end totalmente desacoplado.

## O que o projeto faz

- Lista os posts publicados na Home, consumindo `GET /wp-json/wp/v2/posts`.
- Exibe uma página individual para cada post (`/posts/[slug]`), consumindo `GET /wp-json/wp/v2/posts?slug=...`.
- Separa a lógica pura (parsing de HTML, formatação de data e mapeamento de dados) da lógica de rede, permitindo testes unitários sem depender de conexão real.

## O que o projeto não faz (escopo fechado)

- Sem autenticação e sem área logada.
- Sem comentários.
- Sem CMS customizado, custom post types ou campos ACF.
- Sem paginação além do limite simples de `per_page`.

## Configuração

```bash
cp .env.example .env
```

Edite o arquivo `.env` e defina:

```env
WORDPRESS_API_URL=https://seusite.com.br
```

Nenhuma mudança de código é necessária. A REST API do WordPress vem habilitada por padrão desde a versão 4.7. Para confirmar que está ativa, acesse `https://seusite.com.br/wp-json/wp/v2/posts` no navegador e verifique se a resposta é um JSON válido.

## Instalação e uso

```bash
npm install
npm run dev
```

## Rodando os testes

```bash
npm test
```

Os testes cobrem a lógica pura de parsing (remoção de tags HTML, formatação de data e mapeamento de posts), usando uma fixture baseada no formato real de resposta da REST API do WordPress, sem depender de rede.

## Stack

Next.js 16 (App Router), TypeScript e Jest.