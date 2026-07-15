import { stripHtml, formatPostDate, mapRawPostToPost, WPRawPost } from "../lib/wordpress";
import fixtureData from "./fixtures/wp-posts-response.json";

const fixture = fixtureData as unknown as WPRawPost[];

describe("stripHtml", () => {
  it("remove tags HTML simples", () => {
    expect(stripHtml("<p>Olá mundo</p>")).toBe("Olá mundo");
  });

  it("converte entidades HTML comuns do WordPress", () => {
    expect(stripHtml("Isso&hellip;")).toBe("Isso…");
    expect(stripHtml("WordPress&#8217;s API")).toBe("WordPress's API");
    expect(stripHtml("&#8220;citação&#8221;")).toBe('"citação"');
  });

  it("remove espaços em branco nas extremidades", () => {
    expect(stripHtml("  <p>texto</p>  \n")).toBe("texto");
  });
});

describe("formatPostDate", () => {
  it("formata a data ISO para pt-BR", () => {
    const formatted = formatPostDate("2026-03-15T09:30:00");
    expect(formatted).toContain("2026");
    expect(formatted).toContain("março");
  });
});

describe("mapRawPostToPost", () => {
  it("converte um post bruto da API para o formato da aplicação", () => {
    const raw = fixture[0];
    const post = mapRawPostToPost(raw);

    expect(post.id).toBe(101);
    expect(post.slug).toBe("por-que-performance-importa-no-front-end");
    expect(post.title).toBe("Por que performance importa no front-end");
    expect(post.excerpt).toContain("Core Web Vitals");
    expect(post.excerpt).not.toContain("<p>");
    expect(post.date).toContain("2026");
  });

  it("processa corretamente o segundo item da fixture, com entidades HTML no excerpt", () => {
    const raw = fixture[1];
    const post = mapRawPostToPost(raw);

    expect(post.title).toContain("Segurança aplicada a front-end");
    expect(post.excerpt).toContain("formulário's e checkout");
    expect(post.excerpt).not.toContain("&#8217;");
  });

  it("mantém o conteúdo completo (content) com HTML intacto, para renderização", () => {
    const raw = fixture[0];
    const post = mapRawPostToPost(raw);

    expect(post.content).toContain("<p>");
  });
});
