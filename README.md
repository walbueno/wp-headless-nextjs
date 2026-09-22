# WordPress Headless + Next.js

Aplicação web desenvolvida com **Next.js, React e TypeScript**, utilizando o WordPress como CMS desacoplado através da REST API.

O projeto explora uma arquitetura headless na qual o WordPress é responsável pelo gerenciamento de conteúdo enquanto o Next.js atua como camada de apresentação.

---

## 🎯 Objetivo

O objetivo é demonstrar uma integração entre um CMS tradicional e uma aplicação moderna baseada em React/Next.js.

A arquitetura separa:

* gerenciamento de conteúdo;
* acesso aos dados;
* transformação dos dados;
* apresentação.

---

## 🏗️ Arquitetura

```text
┌──────────────┐
│  WordPress   │
│     CMS      │
└──────┬───────┘
       │
       │ REST API
       ▼
┌──────────────┐
│ lib/         │
│ wordpress.ts │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Next.js   │
│      UI      │
└──────────────┘
```

Essa abordagem permite separar o gerenciamento do conteúdo da experiência de apresentação.

---

## 📰 Funcionalidades

A aplicação contempla:

* listagem de posts;
* visualização individual de posts;
* rotas dinâmicas;
* consumo da REST API do WordPress;
* transformação dos dados;
* revalidação de conteúdo.

---

## 🔄 Camada de dados

A integração com WordPress está concentrada em uma camada específica.

A aplicação diferencia o modelo recebido da API do modelo utilizado pela interface.

```text
Raw WordPress Post
        ↓
Transformation
        ↓
Application Post
        ↓
UI
```

Essa separação reduz o acoplamento entre a API externa e os componentes da aplicação.

---

## 🧹 Transformação de dados

O projeto possui funções responsáveis por operações como:

* remoção de HTML;
* formatação de datas;
* transformação do modelo recebido;
* normalização das informações utilizadas pela interface.

Essas funções são mantidas separadas da apresentação.

---

## ⚡ Revalidação

As requisições utilizam revalidação para evitar que o conteúdo seja necessariamente buscado novamente a cada acesso.

O projeto utiliza uma janela de revalidação de **60 segundos** para os dados configurados dessa maneira.

---

## 🧪 Testes

O projeto possui testes para a camada de transformação e mapeamento dos dados.

Os testes utilizam fixtures para evitar dependência direta de uma instância real do WordPress.

Isso permite verificar a transformação dos dados de forma isolada.

---

## 🔐 Segurança

A aplicação utiliza `dangerouslySetInnerHTML` em determinados pontos para renderização de conteúdo HTML proveniente do WordPress.

Isso exige atenção especial em uma implementação de produção.

O projeto **não afirma que essa abordagem é automaticamente segura contra XSS**.

Em um cenário de produção, seria necessário estabelecer uma estratégia explícita de confiança, sanitização e validação do conteúdo recebido.

---

## 🧠 Decisões técnicas

O projeto explora:

* arquitetura Headless;
* Next.js;
* React;
* TypeScript;
* REST API;
* separação entre dados e apresentação;
* transformação de modelos;
* revalidação;
* testes unitários.

---

## 📦 Stack

* Next.js
* React
* TypeScript
* WordPress REST API
* Jest

---

## 🚧 Escopo

Este projeto concentra-se na integração entre WordPress e Next.js.

Não possui:

* painel administrativo próprio;
* sistema de autenticação;
* banco de dados próprio;
* criação de conteúdo no Next.js;
* infraestrutura de produção.

O WordPress permanece responsável pelo gerenciamento do conteúdo.

---

## 🔄 Possíveis evoluções

* paginação;
* busca;
* categorias;
* tags;
* preview de conteúdo;
* autenticação para preview;
* estratégia de cache mais avançada;
* sanitização explícita de HTML;
* observabilidade;
* otimização de imagens.

---

## 💡 Relação com minha trajetória

O projeto também representa uma evolução técnica da experiência acumulada com WordPress.

A experiência histórica com desenvolvimento WordPress é aplicada aqui em uma arquitetura diferente, utilizando o CMS como fonte de conteúdo e o Next.js como camada de apresentação.

---

## 💡 O que este projeto demonstra

* desenvolvimento de aplicações web;
* Next.js;
* React;
* TypeScript;
* arquitetura Headless;
* integração com APIs;
* transformação de dados;
* separação de responsabilidades;
* testes;
* evolução de arquiteturas tradicionais para abordagens modernas.

---

## 👨‍💻 Autor

**William Bueno**

Software Engineer · Web Applications · Digital Products

* [GitHub](https://github.com/walbueno)
* [LinkedIn](https://www.linkedin.com/in/walbueno)
* [Portfolio](https://williambueno.com.br)
* [Beez Creative](https://beezcreative.com.br)
