const pool = require('./database');

const createTables = async () => {
  try {
    await pool.query(`
      -- Tabela pessoa
      CREATE TABLE IF NOT EXISTS pessoa (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        endereco VARCHAR(255),
        cidade VARCHAR(100),
        estado VARCHAR(2),
        cep VARCHAR(10),
        telefone VARCHAR(20),
        email VARCHAR(255),
        linkedin VARCHAR(255),
        github VARCHAR(255),
        objetivo_profissional TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tabela formacao
      CREATE TABLE IF NOT EXISTS formacao (
        id SERIAL PRIMARY KEY,
        pessoa_id INTEGER NOT NULL REFERENCES pessoa(id) ON DELETE CASCADE,
        curso VARCHAR(255) NOT NULL,
        instituicao VARCHAR(255) NOT NULL,
        inicio VARCHAR(50),
        fim VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tabela experiencia
      CREATE TABLE IF NOT EXISTS experiencia (
        id SERIAL PRIMARY KEY,
        pessoa_id INTEGER NOT NULL REFERENCES pessoa(id) ON DELETE CASCADE,
        cargo VARCHAR(255) NOT NULL,
        empresa VARCHAR(255) NOT NULL,
        inicio VARCHAR(50),
        fim VARCHAR(50),
        descricao TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tabela ferramenta_utilizada
      CREATE TABLE IF NOT EXISTS ferramenta_utilizada (
        id SERIAL PRIMARY KEY,
        experiencia_id INTEGER NOT NULL REFERENCES experiencia(id) ON DELETE CASCADE,
        nome VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tabela conhecimento
      CREATE TABLE IF NOT EXISTS conhecimento (
        id SERIAL PRIMARY KEY,
        pessoa_id INTEGER NOT NULL REFERENCES pessoa(id) ON DELETE CASCADE,
        curso VARCHAR(255) NOT NULL,
        instituicao VARCHAR(255) NOT NULL,
        ano VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tabela softskill
      CREATE TABLE IF NOT EXISTS softskill (
        id SERIAL PRIMARY KEY,
        pessoa_id INTEGER NOT NULL REFERENCES pessoa(id) ON DELETE CASCADE,
        descricao VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Tabela habilidade
      CREATE TABLE IF NOT EXISTS habilidade (
        id SERIAL PRIMARY KEY,
        pessoa_id INTEGER NOT NULL REFERENCES pessoa(id) ON DELETE CASCADE,
        nome VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tabelas criadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    process.exit(1);
  }
};

createTables();

