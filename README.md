# Projeto N2/N3 — Testes funcionais, UI e carga

Resumo
- Servidor mock em `src/server.js` expondo endpoints locais (/posts, /users).
- Frontend mínimo em `public/` (posts.html, users.html).
- Testes funcionais em `test/` (Mocha/Chai).
- Testes de UI em `ui-tests/` (Playwright).
- Testes de carga em `load-tests/` (Artillery).

Pré-requisitos
- Node.js (v16+ recomendado) e pnpm ou npm instalados.
- Recomendado instalar Playwright browsers: `npx playwright install` (quando necessário).

Instalação
1. Instalar dependências:
   - pnpm: `pnpm install`
   - ou npm: `npm install`

Executando o servidor mock (API local)
- Iniciar servidor: `pnpm start`
  - Por padrão o servidor roda em: `http://localhost:3001`
- Endpoints disponíveis (retornam JSON estático):
  - `GET /posts`
  - `GET /users`

Servir frontend estático (opcional)
- Iniciar servidor estático (porta 3002): `pnpm start:ui`
- Acesse:
  - Posts: `http://localhost:3002/posts.html`
  - Users: `http://localhost:3002/users.html`
- Alternativamente, abra `http://localhost:3001/posts.html`/`users.html` quando `pnpm start` estiver em execução (servidor mock também serve `public/`).

Testes funcionais (Mocha)
- Executar todos os testes: `pnpm test`
- Comando aponta para os arquivos em `test/**/*.test.js`.

Testes de UI (Playwright)
1. Certifique-se que o servidor mock esteja rodando: `pnpm start`
2. Executar testes Playwright:
   - `pnpm test:ui`
3. Se necessário, instalar navegadores Playwright:
   - `npx playwright install`
4. Variável opcional: usar `BASE_URL` para apontar outro host:
   - `BASE_URL=http://localhost:3001 pnpm test:ui`

Testes de carga (Artillery)
- Arquivo de cenário: `load-tests/scenario.yml`
- Executar: `pnpm test:performance`
- Observação: cenário padrão usa 20 usuários por 30s contra `GET /posts` em `http://localhost:3001`.

Execução combinada (UI CI)
- Script `ci:ui` usa `concurrently` para rodar servidor mock, servidor UI e testes UI:
  - `pnpm run ci:ui`
- Pode requerer ajustes locais (portas, disponibilidade).

Estrutura rápida
- src/
  - server.js (mock server)
  - data/ (dados estáticos: posts.json, users.json)
- public/
  - posts.html, users.html
- test/ (Mocha)
- ui-tests/ (Playwright)
- load-tests/ (Artillery)

Notas
- Testes de carga devem sempre rodar contra o servidor mock local (não executar contra APIs externas).
- Ajuste portas via variável `PORT` ao iniciar o servidor: `PORT=3001 pnpm start`
- Para problemas com Playwright, rode `npx playwright test --debug` ou instale navegadores conforme indicado.

Contato
- Instruções concisas no README; para detalhes de implementação consulte os arquivos em `src/`, `public/`, `ui-tests/` e `load-tests/`.

## Rodando todos os testes

Resumo rápido — execução segura (recomendo abrir 2 ou 3 terminais):

1) Instalar dependências
- pnpm: `pnpm install`
- ou npm: `npm install`

2) Iniciar o servidor mock (obrigatório para UI e carga)
- Em um terminal:  
  `pnpm start`  
  (ou `node src/server.js`)  
  O servidor padrão é `http://localhost:3001`.

3) Executar testes funcionais (Mocha/Chai)
- Em outro terminal:  
  `pnpm test`  
  (equivalente a `pnpm exec mocha test/**/*.test.js`)

4) Preparar Playwright (somente se necessário)
- Instalar navegadores Playwright (apenas uma vez):  
  `npx playwright install`

5) Executar testes de UI (Playwright)
- Com o servidor mock rodando, em outro terminal:  
  `pnpm test:ui`  
- Para apontar a uma URL diferente:  
  `BASE_URL=http://outro:porta pnpm test:ui`

6) Executar testes de carga (Artillery)
- Com o servidor mock rodando, em outro terminal:  
  `pnpm test:performance`  
  (usa `load-tests/scenario.yml`, padrão: 20 usuários por 30s contra `/posts`)

Execução sequencial automática (exemplo)
- Se quiser rodar os testes em sequência automaticamente (assumindo servidor já iniciado):
  `pnpm test && pnpm test:ui && pnpm test:performance`

Dicas e observações
- Garanta que `pnpm start` esteja ativo antes de rodar UI e carga.  
- Se Playwright reclamar de browsers ausentes, rode `npx playwright install`.  
- Para servir o frontend separadamente: `pnpm start:ui` (porta 3002 por padrão).  
- Use `PORT` para mudar a porta do servidor mock: `PORT=3001 pnpm start`.
