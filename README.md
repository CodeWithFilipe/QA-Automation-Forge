# Projeto de Testes - Mocha + Chai + Sinon + Chai-HTTP

Este projeto demonstra a aplicação de diferentes tipos de testes em Node.js utilizando as bibliotecas Mocha, Chai, Sinon e Chai-HTTP. Os dados são obtidos da API real **[JSONPlaceholder](https://jsonplaceholder.typicode.com/).**

## Instalação e Execução

### Pré-requisitos

- **Node.js** (versão 14 ou superior) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)

### Passo 1: Clonar o Repositório

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Entre na pasta do projeto
cd n2_samuel
```

### Passo 2: Instalar o pnpm

O **pnpm** é um gerenciador de pacotes rápido e eficiente que economiza espaço em disco.

#### Windows (PowerShell)

```powershell
# Usando npm
npm install -g pnpm

# Ou usando Chocolatey
choco install pnpm

# Ou usando Scoop
scoop install pnpm
```

#### Linux/macOS

```bash
# Usando npm
npm install -g pnpm

# Ou usando curl
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Ou usando wget
wget -qO- https://get.pnpm.io/install.sh | sh -

# Ou usando Homebrew (macOS)
brew install pnpm
```

#### Verificar instalação

```bash
pnpm --version
```

### Passo 3: Instalar Dependências

```bash
# Instalar todas as dependências do projeto
pnpm install
```

### Passo 4: Executar os Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes específicos
pnpm exec mocha test/unit.users.test.js
pnpm exec mocha test/api.test.js
pnpm exec mocha test/integration.test.js
```

### Comandos Úteis do pnpm

```bash
# Instalar uma nova dependência
pnpm add <pacote>

# Instalar uma dependência de desenvolvimento
pnpm add -D <pacote>

# Remover uma dependência
pnpm remove <pacote>

# Atualizar dependências
pnpm update

# Limpar cache
pnpm store prune
```

## Estrutura do Projeto

```bash
n2_samuel/
├── src/                    # Código-fonte
│   ├── app.js             # Aplicação Express com API REST
│   ├── users/
│   │   └── users.js       # Funções de usuários
│   ├── posts/
│   │   └── posts.js       # Funções de posts
│   ├── comments/
│   │   └── comments.js    # Funções de comentários
│   ├── todos/
│   │   └── todos.js       # Funções de tarefas
│   ├── albums/
│   │   └── albums.js      # Funções de álbuns
│   └── photos/
│       └── photos.js      # Funções de fotos
├── test/                   # Testes
│   ├── unit.users.test.js # Testes unitários de usuários
│   ├── unit.posts.test.js # Testes unitários de posts
│   ├── unit.todos.test.js # Testes unitários de todos
│   ├── unit.comments.test.js # Testes unitários de comentários
│   ├── api.test.js        # Testes de API
│   └── integration.test.js # Testes de integração
└── package.json
```

## ✅ Executar Testes (Resumo)

```bash
# Executar todos os testes
pnpm test

# Executar testes específicos
pnpm exec mocha test/unit.users.test.js
pnpm exec mocha test/api.test.js
pnpm exec mocha test/integration.test.js

# Executar com mais detalhes
pnpm test -- --reporter spec

# Executar com timeout customizado
pnpm test -- --timeout 10000
```

## 📚 Tipos de Testes Implementados

### 1. Testes Unitários

Testam funções individuais isoladamente.

**Arquivos:**

- `test/unit.users.test.js`
- `test/unit.posts.test.js`
- `test/unit.todos.test.js`
- `test/unit.comments.test.js`

### 2. Testes de API

Testam endpoints HTTP da aplicação.

**Arquivo:** `test/api.test.js`

### 3. Testes de Integração

Testam a integração entre múltiplos módulos e fluxos completos.

**Arquivo:** `test/integration.test.js`

## 🔍 Demonstração dos Estilos de Asserção

### Assert (Node.js nativo)

```javascript
assert.strictEqual(value, expected);
assert.deepStrictEqual(obj1, obj2);
assert.throws(fn, /error message/);
assert.doesNotThrow(fn);
assert.match(string, /regex/);
assert.ok(value);
assert.notEqual(a, b);
```

### Expect (Chai)

```javascript
expect(value).to.equal(expected);
expect(obj).to.have.property("key");
expect(value).to.be.a("type");
expect(array).to.contain(item);
expect(array).to.have.lengthOf(n);
expect(value).to.be.null;
expect(obj).to.have.keys(["key1", "key2"]);
expect(num).to.be.above(n);
expect(value).to.be.instanceof(Class);
expect(string).to.include("substring");
```

### Should (Chai)

```javascript
value.should.be.an("array");
array.should.have.lengthOf(n);
obj.should.have.property("key");
value.should.equal(expected);
bool.should.be.true;
bool.should.be.false;
array.should.include(item);
num.should.be.above(n);
value.should.be.a("string");
```

## 🛠️ Ferramentas Utilizadas

### Gerenciamento de Pacotes

- **pnpm** (v9+): Gerenciador de pacotes rápido e eficiente
  - Economiza espaço em disco usando hard links
  - Instalação mais rápida que npm/yarn
  - Estrutura de node_modules não-flat (mais segura)

### Testing Framework

- **Mocha** (v10.8.2): Framework de testes
- **Chai** (v4.5.0): Biblioteca de asserções (assert, expect, should)
- **Sinon** (v17.0.2): Biblioteca para mocks, stubs e spies
- **Chai-HTTP** (v4.4.0): Plugin Chai para testes de API HTTP

### Runtime & HTTP

- **Node.js**: Ambiente de execução JavaScript
- **Express** (v4.21.2): Framework web para API REST
- **Axios** (v1.13.0): Cliente HTTP para requisições à API JSONPlaceholder

## 📡 Endpoints da API

### Usuários

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `POST /users` - Criar novo usuário

### Posts

- `GET /posts` - Listar todos os posts
- `GET /posts/user/:userId` - Buscar posts por usuário
- `POST /posts` - Criar novo post

### Comentários

- `GET /comments` - Listar todos os comentários
- `GET /comments/post/:postId` - Buscar comentários por post
- `POST /comments` - Criar novo comentário

### Tarefas (Todos)

- `GET /todos` - Listar todas as tarefas
- `PATCH /todos/:id/complete` - Marcar tarefa como concluída
- `POST /todos` - Criar nova tarefa

### Álbuns

- `GET /albums` - Listar todos os álbuns
- `GET /albums/user/:userId` - Buscar álbuns por usuário

### Fotos

- `GET /photos` - Listar todas as fotos
- `GET /photos/album/:albumId` - Buscar fotos por álbum

## 📊 Estatísticas de Testes

### Testes Unitários

- ✅ Mínimo 5 tipos diferentes de `assert`
- ✅ Mínimo 5 tipos diferentes de `expect`
- ✅ Mínimo 5 tipos diferentes de `should`

### Funcionalidades Testadas

- ✅ CRUD de usuários
- ✅ CRUD de posts
- ✅ CRUD de comentários
- ✅ CRUD de tarefas
- ✅ Validações de dados
- ✅ Tratamento de erros
- ✅ Integração entre módulos
- ✅ Testes de API REST
- ✅ Mocks e Stubs com Sinon

## 🎯 Conceitos Demonstrados

1. **Testes Unitários**: Isolamento de funções e validação de lógica
2. **Testes de API**: Validação de endpoints HTTP e respostas
3. **Testes de Integração**: Fluxos completos e interação entre módulos
4. **Mocking/Stubbing**: Simulação de comportamentos com Sinon
5. **Spies**: Verificação de chamadas de funções
6. **Asserções Diversas**: assert, expect e should
7. **Testes Assíncronos**: Callbacks e Promises
8. **Validação de Erros**: Testes de exceções e casos de erro

## 📝 Observações

- O projeto não utiliza módulos ES (usa `require`/`module.exports`)
- **[Os dados vêm do JSONPlaceholder](https://jsonplaceholder.typicode.com/)**
- A API faz requisições HTTP reais ao JSONPlaceholder
- A API está configurada para não iniciar o servidor durante os testes
- Todos os testes podem ser executados com `pnpm test`
- Os testes possuem timeout aumentado para lidar com requisições HTTP
- Configuração SSL personalizada para ambientes corporativos (ver `src/axiosConfig.js`)

## 🔧 Solução de Problemas

### Erro de certificado SSL

Se você encontrar erros como `self-signed certificate in certificate chain`, o projeto já possui uma configuração em `src/axiosConfig.js` que ignora esses erros em ambiente de desenvolvimento.

### pnpm não encontrado

Certifique-se de que o pnpm está instalado globalmente:

```bash
npm install -g pnpm
```

### Timeout nos testes

Se os testes estão falhando por timeout, você pode aumentar o valor:

```bash
pnpm test -- --timeout 15000
```

### Problemas com dependências

Limpe o cache e reinstale:

```bash
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🌐 JSONPlaceholder

Este projeto utiliza o [JSONPlaceholder](https://jsonplaceholder.typicode.com/), uma API REST fake gratuita para testes e protótipos. Ela fornece:

- 10 usuários
- 100 posts
- 500 comentários
- 200 tarefas (todos)
- 100 álbuns
- 5000 fotos

Endpoints utilizados:

- `GET https://jsonplaceholder.typicode.com/users`
- `GET https://jsonplaceholder.typicode.com/posts`
- `GET https://jsonplaceholder.typicode.com/comments`
- `GET https://jsonplaceholder.typicode.com/todos`
- `GET https://jsonplaceholder.typicode.com/albums`
- `GET https://jsonplaceholder.typicode.com/photos`
