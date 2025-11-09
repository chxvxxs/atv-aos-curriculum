# API REST - Gerenciamento de Currículos

API REST desenvolvida com Express.js e PostgreSQL para gerenciamento de currículos profissionais.

## Requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

## Instalação

1. **Clone o repositório** (ou navegue até a pasta do projeto)

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o banco de dados:**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

**Opção 1 - Usando DATABASE_URL (recomendado para Supabase):**
```env
DATABASE_URL=postgresql://postgres:12345%23Mc@db.idcnnyohwalszjpbvlcz.supabase.co:5432/postgres
PORT=3000
NODE_ENV=development
```

> **Nota:** A senha `12345#Mc` está codificada como `12345%23Mc` (o `#` vira `%23` na URL)

**Opção 2 - Usando variáveis individuais (para PostgreSQL local):**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=curriculum_db
DB_USER=postgres
DB_PASSWORD=12345
PORT=3000
NODE_ENV=development
```

> **Nota:** Veja o arquivo `CONFIG_SUPABASE.md` para instruções detalhadas sobre como obter a connection string completa do Supabase.

4. **Crie o banco de dados PostgreSQL:**
```bash
createdb curriculum_db
```

5. **Execute as migrações para criar as tabelas:**
```bash
npm run migrate
```

6. **Popule o banco com dados iniciais (2 pessoas):**
```bash
npm run seed
```

## Executando o Projeto

**Modo desenvolvimento (com nodemon):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## Endpoints da API

### Pessoas
- `GET /api/pessoas` - Lista todas as pessoas
- `GET /api/pessoas/:id` - Busca uma pessoa por ID
- `POST /api/pessoas` - Cria uma nova pessoa
- `PUT /api/pessoas/:id` - Atualiza uma pessoa
- `DELETE /api/pessoas/:id` - Remove uma pessoa

### Formações
- `GET /api/formacoes` - Lista todas as formações (ou filtra por `?pessoa_id=1`)
- `GET /api/formacoes/:id` - Busca uma formação por ID
- `POST /api/formacoes` - Cria uma nova formação
- `PUT /api/formacoes/:id` - Atualiza uma formação
- `DELETE /api/formacoes/:id` - Remove uma formação

### Experiências
- `GET /api/experiencias` - Lista todas as experiências (ou filtra por `?pessoa_id=1`)
- `GET /api/experiencias/:id` - Busca uma experiência por ID
- `POST /api/experiencias` - Cria uma nova experiência
- `PUT /api/experiencias/:id` - Atualiza uma experiência
- `DELETE /api/experiencias/:id` - Remove uma experiência

### Ferramentas Utilizadas
- `GET /api/ferramentas-utilizadas` - Lista todas (ou filtra por `?experiencia_id=1`)
- `GET /api/ferramentas-utilizadas/:id` - Busca por ID
- `POST /api/ferramentas-utilizadas` - Cria nova ferramenta
- `PUT /api/ferramentas-utilizadas/:id` - Atualiza ferramenta
- `DELETE /api/ferramentas-utilizadas/:id` - Remove ferramenta

### Conhecimentos
- `GET /api/conhecimentos` - Lista todos (ou filtra por `?pessoa_id=1`)
- `GET /api/conhecimentos/:id` - Busca por ID
- `POST /api/conhecimentos` - Cria novo conhecimento
- `PUT /api/conhecimentos/:id` - Atualiza conhecimento
- `DELETE /api/conhecimentos/:id` - Remove conhecimento

### Soft Skills
- `GET /api/softskills` - Lista todas (ou filtra por `?pessoa_id=1`)
- `GET /api/softskills/:id` - Busca por ID
- `POST /api/softskills` - Cria nova soft skill
- `PUT /api/softskills/:id` - Atualiza soft skill
- `DELETE /api/softskills/:id` - Remove soft skill

### Habilidades
- `GET /api/habilidades` - Lista todas (ou filtra por `?pessoa_id=1`)
- `GET /api/habilidades/:id` - Busca por ID
- `POST /api/habilidades` - Cria nova habilidade
- `PUT /api/habilidades/:id` - Atualiza habilidade
- `DELETE /api/habilidades/:id` - Remove habilidade

## Exemplos de Uso

### Criar uma Pessoa
```bash
POST /api/pessoas
Content-Type: application/json

{
  "nome": "João Silva",
  "endereco": "Rua Exemplo, 123",
  "cidade": "Recife",
  "estado": "PE",
  "cep": "50000-000",
  "telefone": "(81) 99999-9999",
  "email": "joao@email.com",
  "linkedin": "linkedin.com/in/joao-silva",
  "github": "github.com/joaosilva",
  "objetivo_profissional": "Desenvolver soluções inovadoras"
}
```

### Criar uma Formação
```bash
POST /api/formacoes
Content-Type: application/json

{
  "pessoa_id": 1,
  "curso": "Bacharelado em Ciência da Computação",
  "instituicao": "UFPE",
  "inicio": "2018",
  "fim": "2022"
}
```

### Criar uma Experiência
```bash
POST /api/experiencias
Content-Type: application/json

{
  "pessoa_id": 1,
  "cargo": "Desenvolvedor Full Stack",
  "empresa": "Tech Solutions",
  "inicio": "jan 2023",
  "fim": "atual",
  "descricao": "Desenvolvimento de aplicações web"
}
```

### Criar Ferramenta Utilizada
```bash
POST /api/ferramentas-utilizadas
Content-Type: application/json

{
  "experiencia_id": 1,
  "nome": "React"
}
```

## Estrutura do Banco de Dados

O banco de dados possui as seguintes entidades e relacionamentos:

- **pessoa** (1:N com todas as outras tabelas)
- **formacao** (N:1 com pessoa)
- **experiencia** (N:1 com pessoa)
- **ferramenta_utilizada** (N:1 com experiencia)
- **conhecimento** (N:1 com pessoa)
- **softskill** (N:1 com pessoa)
- **habilidade** (N:1 com pessoa)

## Estrutura do Projeto

```
Projeto Curriculum/
├── src/
│   ├── config/
│   │   ├── database.js       # Configuração do PostgreSQL
│   │   ├── migrate.js        # Script de criação das tabelas
│   │   └── seed.js           # Script de população inicial
│   ├── controllers/          # Controladores (CRUD)
│   ├── routes/               # Rotas da API
│   ├── middlewares/          # Middlewares
│   ├── app.js                # Configuração do Express
│   └── server.js             # Inicialização do servidor
├── package.json
└── README.md
```

## Scripts Disponíveis

- `npm start` - Inicia o servidor
- `npm run dev` - Inicia o servidor em modo desenvolvimento (com nodemon)
- `npm run migrate` - Cria as tabelas no banco de dados
- `npm run seed` - Popula o banco com dados iniciais (2 pessoas)

## Deploy no Vercel

O Vercel não oferece banco de dados PostgreSQL diretamente. Você precisará usar um serviço externo. Opções recomendadas:

### Opções de Banco de Dados (Gratuitas)

1. **Supabase** (Recomendado) - https://supabase.com
   - Gratuito até 500MB
   - PostgreSQL gerenciado
   - Interface web para gerenciar o banco

2. **Railway** - https://railway.app
   - Plano gratuito com créditos mensais
   - PostgreSQL com um clique

3. **Neon** - https://neon.tech
   - PostgreSQL serverless gratuito

4. **ElephantSQL** - https://www.elephantsql.com
   - Plano gratuito com 20MB

### Passo a Passo para Deploy

1. **Criar banco de dados:**
   - Escolha um dos serviços acima
   - Crie uma instância PostgreSQL
   - Copie a **DATABASE_URL** (string de conexão completa)

2. **Configurar variáveis no Vercel:**
   - No painel do Vercel, vá em **Settings > Environment Variables**
   - Adicione a variável `DATABASE_URL` com a string de conexão
   - Opcionalmente, adicione `NODE_ENV=production`

3. **Fazer deploy:**
   ```bash
   # Instale o Vercel CLI (se ainda não tiver)
   npm i -g vercel
   
   # Faça login
   vercel login
   
   # Deploy
   vercel
   
   # Ou conecte seu repositório GitHub no painel do Vercel
   ```

4. **Executar migrações no banco de produção:**
   - Você pode usar o mesmo script `migrate.js` localmente apontando para o banco de produção:
   ```bash
   DATABASE_URL="sua_database_url_aqui" npm run migrate
   ```
   - Ou execute os SQLs manualmente no painel do seu serviço de banco

5. **Popular dados iniciais:**
   ```bash
   DATABASE_URL="sua_database_url_aqui" npm run seed
   ```

### Configuração Alternativa (Variáveis Individuais)

Se preferir usar variáveis individuais ao invés de `DATABASE_URL`, configure no Vercel:
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## Dados Iniciais

O projeto já vem com 2 pessoas cadastradas:

1. **Matheus Chaves Leôncio de Lira** - Com formações, experiências, habilidades, etc.
2. **Maria Silva Santos** - Exemplo adicional

Execute `npm run seed` para popular o banco de dados com esses dados.

