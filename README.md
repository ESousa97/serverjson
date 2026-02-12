<div align="center">

# EsDataBase API

[![CI](https://img.shields.io/github/actions/workflow/status/ESousa97/serverjson/ci.yml?style=flat&logo=github-actions&logoColor=white)](https://github.com/ESousa97/serverjson/actions/workflows/ci.yml)
[![CodeFactor](https://img.shields.io/codefactor/grade/github/ESousa97/serverjson?style=flat&logo=codefactor&logoColor=white)](https://www.codefactor.io/repository/github/esousa97/serverjson)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Archived-lightgrey.svg?style=flat&logo=archive&logoColor=white)](#)

**API Node.js + Express com integração PostgreSQL, pronta para rodar localmente e para deploy em Vercel Functions.**

[Documentação](docs/API.md)

</div>

---

> **⚠️ Projeto Arquivado**
> Este projeto não recebe mais atualizações ou correções. O código permanece disponível como referência e pode ser utilizado livremente sob a licença MIT. Fique à vontade para fazer fork caso deseje continuar o desenvolvimento.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Começando](#começando)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Configuração](#configuração)
  - [Uso Local](#uso-local)
- [Endpoints](#endpoints)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Deploy](#deploy)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre o Projeto

Este projeto é uma API REST focada em simplicidade, performance e manutenibilidade. Desenvolvida com Node.js e Express, integra-se ao PostgreSQL e é compatível com **Vercel Functions** para deploy serverless.

O repositório prioriza:

- **Endpoints HTTP simples e estáveis** — Contrato claro e bem documentado
- **Integração com Postgres** — Via variáveis de ambiente, sem configuração hardcoded
- **Boas práticas de manutenção** — Lint, testes, CI, docs e governança
- **Padrão DRY** — Factory `createHandler` que elimina boilerplate nos endpoints

### Por que Express + Vercel Functions?

A combinação permite desenvolvimento local com servidor Express tradicional e deploy serverless sem alterar os handlers. Cada arquivo em `api/*.js` funciona como um endpoint independente na Vercel, mantendo compatibilidade total com o servidor local.

---

## Funcionalidades

- **Listagem de cards** — Endpoint para recuperar todos os cards cadastrados
- **Listagem de procedimentos** — Consulta completa de procedimentos
- **Consulta por ID** — Busca de procedimento específico com validação
- **Busca por conteúdo** — Pesquisa `ILIKE` com fallback quando `similarity()` não estiver disponível
- **Security headers automáticos** — `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`
- **CORS configurável** — Suporte a preflight e origem customizável
- **Testes automatizados** — 11 testes cobrindo todos os endpoints

---

## Tecnologias

### Core

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

### Ferramentas de Desenvolvimento

![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

**Requisitos mínimos:**

- Node.js 20+ (recomendado)
- npm 9+
- PostgreSQL (para endpoints que consultam o banco)

---

## Começando

### Pré-requisitos

```bash
node --version  # v20 ou superior
npm --version   # v9 ou superior
```

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/ESousa97/EsDataBase.git
cd EsDataBase
```

2. **Instale as dependências**

```bash
npm ci
```

### Configuração

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Preencha as variáveis necessárias:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/esdatabase
CORS_ORIGIN=*
PGSSL_DISABLE=1
```

> **Nota:** Em produção (Vercel), use as variáveis fornecidas pela plataforma (`POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, etc.).

### Uso Local

**Subir o servidor:**

```bash
npm start
```

**Teste rápido:**

```bash
curl http://localhost:3000/
curl http://localhost:3000/api/cards
curl "http://localhost:3000/api/procedure?id=1"
curl "http://localhost:3000/api/procedure/1"
curl "http://localhost:3000/api/search?query=termo"
```

Acesse: `http://localhost:3000/`

---

## Endpoints

| Método | Rota                      | Descrição                                           |
| ------ | ------------------------- | --------------------------------------------------- |
| `GET`  | `/`                       | Health check — retorna status e lista de endpoints  |
| `GET`  | `/api/cards`              | Retorna todos os cards (alias: `/api/cardlist`)     |
| `GET`  | `/api/categories`         | Retorna todos os procedimentos                      |
| `GET`  | `/api/procedure?id=1`     | Retorna procedimento por ID (ou `/api/procedure/1`) |
| `GET`  | `/api/search?query=termo` | Busca por conteúdo com `ILIKE`                      |

> Documentação completa dos endpoints em [`docs/API.md`](docs/API.md).

---

## Scripts Disponíveis

```bash
# Iniciar servidor local
npm start

# Modo desenvolvimento (com hot reload)
npm run dev

# Formatar código automaticamente
npm run format

# Verificar formatação
npm run format:check

# Executar lint
npm run lint

# Rodar testes
npm test

# Testes com watch mode
npm run test:watch

# Testes com cobertura
npm run test:coverage

# Quality gate completo (format + lint + test)
npm run check
```

---

## Estrutura do Projeto

```
EsDataBase/
├── api/
│   ├── index.js               # Entrypoint + servidor local
│   ├── app.js                 # Configuração do Express
│   ├── cardlist.js            # Handler: listagem de cards
│   ├── categories.js          # Handler: listagem de procedimentos
│   ├── procedure.js           # Handler: procedimento por ID
│   └── search.js              # Handler: busca por conteúdo
├── src/
│   ├── config/
│   │   └── env.js             # Carregamento de variáveis de ambiente
│   ├── db/
│   │   ├── index.js           # Barrel export (db)
│   │   ├── client.js          # Pool de conexão PostgreSQL
│   │   └── queries.js         # Queries SQL centralizadas
│   └── http/
│       ├── index.js           # Barrel export (http)
│       ├── cors.js            # CORS + security headers
│       ├── createHandler.js   # Factory para handlers DRY
│       ├── handleError.js     # Tratamento de erros padronizado
│       ├── respond.js         # Helpers de resposta HTTP
│       └── validation.js      # Validação de parâmetros
├── tests/
│   └── api.test.js            # Testes automatizados (Jest + Supertest)
├── docs/
│   ├── API.md                 # Documentação dos endpoints
│   └── ARCHITECTURE.md        # Documentação de arquitetura
├── .github/
│   └── workflows/
│       ├── ci.yml             # Pipeline de CI
│       └── release-please.yml # Release automatizado
├── db.json                    # Queries SQL centralizadas
├── vercel.json                # Configuração de deploy Vercel
├── package.json               # Dependências e scripts
├── CHANGELOG.md               # Histórico de mudanças
└── LICENSE                    # Licença MIT
```

> Para mais detalhes sobre a arquitetura, consulte [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Arquitetura

O projeto segue um padrão de camadas com factory pattern para eliminar boilerplate:

```
Client
  → Vercel / Express
    → api/<endpoint>.js
      → createHandler (CORS + security headers + try/catch)
        → src/http/* (validation/respond)
        → src/db/* (client/queries)
          → PostgreSQL
```

O `createHandler` encapsula CORS preflight, validação de método (GET only), try/catch com `handleError` e security headers automáticos — reduzindo cada handler de ~20 linhas para ~7 linhas.

> Diagrama completo e detalhes em [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Deploy

### Vercel (Produção)

Cada arquivo em `api/*.js` é automaticamente tratado como um endpoint serverless. O deploy é configurado via `vercel.json` com rewrites para rotas parametrizadas.

```bash
vercel --prod
```

### Local

```bash
npm start
# ou com hot reload:
npm run dev
```

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License - você pode usar, copiar, modificar e distribuir este código.
```

---

## Contato

**José Enoque Costa de Sousa**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enoque-sousa-bb89aa168/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/SousaDev97)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat&logo=todoist&logoColor=white)](https://enoquesousa.vercel.app)

---

<div align="center">

**[⬆ Voltar ao topo](#esdatabase-api)**

Feito com ❤️ por [José Enoque](https://github.com/SousaDev97)

**Status do Projeto:** Archived — Sem novas atualizações

</div>
