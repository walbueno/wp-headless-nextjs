/**
 * Camada de dados do WordPress REST API nativa (/wp-json/wp/v2/).
 * Documentação oficial: https://developer.wordpress.org/rest-api/reference/posts/
 *
 * A URL base vem de uma variável de ambiente para que este projeto funcione
 * contra qualquer instalação WordPress com REST API habilitada, sem alterar código.
 */

export interface WPRenderedField {
  rendered: string;
}

/** Formato bruto de um post, conforme retornado pela REST API do WordPress. */
export interface WPRawPost {
  id: number;
  date: string;
  slug: string;
  title: WPRenderedField;
  content: WPRenderedField;
  excerpt: WPRenderedField;
}

/** Formato simplificado usado pela aplicação, após parsing. */
export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

function getBaseUrl(): string {
  const baseUrl = process.env.WORDPRESS_API_URL;
  if (!baseUrl) {
    throw new Error(
      "WORDPRESS_API_URL não configurada. Copie .env.example para .env e defina a URL do seu WordPress."
    );
  }
  return baseUrl.replace(/\/$/, "");
}

/**
 * Remove tags HTML de um campo "rendered" (usado no excerpt, que vem com <p> e entidades).
 * Função pura, fácil de testar isoladamente.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "…")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}

/**
 * Formata a data de publicação para exibição em pt-BR.
 * Função pura, fácil de testar isoladamente.
 */
export function formatPostDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/**
 * Converte um post bruto da REST API para o formato simplificado da aplicação.
 * Função pura, sem I/O, coberta por testes unitários com fixtures.
 */
export function mapRawPostToPost(raw: WPRawPost): Post {
  return {
    id: raw.id,
    slug: raw.slug,
    title: stripHtml(raw.title.rendered),
    excerpt: stripHtml(raw.excerpt.rendered),
    content: raw.content.rendered,
    date: formatPostDate(raw.date),
  };
}

/**
 * Busca a lista de posts publicados.
 * GET /wp-json/wp/v2/posts
 */
export async function fetchPosts(): Promise<Post[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts?per_page=10`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar posts: ${response.status} ${response.statusText}`);
  }

  const rawPosts: WPRawPost[] = await response.json();
  return rawPosts.map(mapRawPostToPost);
}

/**
 * Busca um único post pelo slug.
 * GET /wp-json/wp/v2/posts?slug=<slug>
 * Retorna null se o post não for encontrado.
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const baseUrl = getBaseUrl();
  const response = await fetch(
    `${baseUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar post: ${response.status} ${response.statusText}`);
  }

  const rawPosts: WPRawPost[] = await response.json();
  if (rawPosts.length === 0) return null;

  return mapRawPostToPost(rawPosts[0]);
}
