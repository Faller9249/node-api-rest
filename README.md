# Node.js REST API - Transactions Management

Uma API RESTful construída com Node.js, Fastify e SQLite para gerenciamento de transações financeiras.

## 📋 Funcionalidades

- ✅ Criar transações (crédito/débito)
- ✅ Listar todas as transações
- ✅ Buscar transação específica por ID
- ✅ Obter resumo financeiro (saldo)
- ✅ Autenticação baseada em cookies (sessionId)
- ✅ Validação de dados com Zod
- ✅ Migrations com Knex.js
- ✅ Testes automatizados com Vitest

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js
- **Framework**: Fastify
- **Banco de Dados**: SQLite com Knex.js
- **Validação**: Zod
- **Testes**: Vitest + Supertest
- **Desenvolvimento**: TypeScript
- **Linting**: ESLint
- **Build**: tsup

## 📦 Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

## ⚙️ Configuração

Edite o arquivo `.env` com suas configurações:

```env
DATABASE_URL="./db/app.db"
NODE_ENV="development"
PORT=3300
```

## 🚀 Como Executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Migrations
```bash
# Executar migrations
npm run knex -- migrate:latest

# Reverter migrations
npm run knex -- migrate:rollback
```

### Testes
```bash
# Executar testes
npm test

# Executar testes em modo watch
npm test -- --watch
```

## 📡 Endpoints

### POST /transactions
Cria uma nova transação.

**Body:**
```json
{
  "title": "Salário",
  "amount": 5000,
  "type": "credit"
}
```

**Response:**
- 201 Created: Transação criada com sucesso
- 400 Bad Request: Dados inválidos

### GET /transactions
Lista todas as transações do usuário (requer sessionId no cookie).

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Salário",
      "amount": 5000,
      "created_at": "timestamp",
      "session_id": "uuid"
    }
  ]
}
```

### GET /transactions/:id
Busca uma transação específica por ID.

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "title": "Salário",
    "amount": 5000,
    "created_at": "timestamp",
    "session_id": "uuid"
  }
}
```

### GET /transactions/summary
Retorna o resumo financeiro (saldo total).

**Response:**
```json
{
  "data": {
    "amount": 3000
  }
}
```

## 🧪 Testes

A suíte de testes inclui:

- Criação de transações
- Listagem de transações
- Busca de transação por ID
- Cálculo de resumo financeiro

Para executar os testes:
```bash
npm test
```

## 📁 Estrutura do Projeto

```
src/
├── app.ts              # Configuração do Fastify
├── server.ts           # Servidor principal
├── env/               # Configuração de ambiente
├── database.ts        # Configuração do Knex
├── middlewares/       # Middlewares personalizados
├── routes/           # Definição das rotas
└── types/            # Definições de tipos TypeScript

db/
├── migrations/       # Arquivos de migration
└── app.db           # Banco de dados SQLite (gerado)

test/                # Testes automatizados
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Compila o projeto TypeScript
- `npm start` - Executa em produção
- `npm run knex` - Executa comandos do Knex
- `npm run lint` - Executa ESLint
- `npm test` - Executa testes

## 🤝 Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.
