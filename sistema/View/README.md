## 📁 Estrutura do Projeto

### ✅ **Pastas**

- **`public/`**
  Armazena arquivos estáticos acessíveis diretamente pelo navegador, como imagens, ícones e fontes.
  Exemplo: `public/logo.png` pode ser acessado em `http://localhost:3000/logo.png`.

- **`src/`**
  Contém todo o código-fonte da aplicação.

  - **`src/pages/`**
    Define as rotas do projeto. Cada arquivo aqui vira automaticamente uma rota com base no nome do arquivo.
    Ex: `src/pages/login.tsx` vira `/login`.

  - **`src/pages/api/`**
    Onde você cria **rotas de backend (API)** com funções serverless.
    Ex: `api/login.ts` vira `POST /api/login`.

- **`styles/`**
  Armazena os arquivos de estilização global (ex: Tailwind, temas, reset.css etc).

- **`node_modules/`**
  Pasta onde o Node.js armazena todas as bibliotecas instaladas via `npm` ou `yarn`. **Não edite manualmente.**

### 📝 **Arquivos principais**

- **`package.json`**
  Arquivo de configuração do projeto: define dependências, scripts (como `dev`, `build`, `start`) e metadados do app.

- **`package-lock.json`**
  Garante que o projeto use exatamente as mesmas versões de bibliotecas em qualquer ambiente. É gerado automaticamente.

- **`tsconfig.json`**
  Configura o **TypeScript** no projeto: define regras de compilação, paths, tipagem, etc.

- **`next.config.ts`**
  Arquivo para configurações personalizadas do **Next.js**, como plugins, otimizações, imagens externas, redirects, etc.

- **`postcss.config.mjs`**
  Usado pelo **Tailwind CSS** e outros plugins para processar o CSS (via PostCSS).

- **`eslint.config.js`**
  Configurações do **ESLint**, que ajuda a manter o código limpo e padronizado, apontando erros e boas práticas.

- **`next-env.d.ts`**
  Arquivo auxiliar criado pelo Next para permitir que o TypeScript compreenda recursos e tipos nativos do framework.
