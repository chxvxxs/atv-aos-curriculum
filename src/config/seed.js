const pool = require('./database');

const seedData = async () => {
  try {
    // Limpar dados existentes
    await pool.query('TRUNCATE TABLE ferramenta_utilizada, experiencia, formacao, conhecimento, softskill, habilidade, pessoa RESTART IDENTITY CASCADE;');

    // Pessoa 1 - Matheus Chaves
    const pessoa1Result = await pool.query(`
      INSERT INTO pessoa (nome, endereco, cidade, estado, cep, telefone, email, linkedin, github, objetivo_profissional)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `, [
      'Matheus Chaves Leôncio de Lira',
      'Rua Solmar, 1005',
      'Paulista',
      'PE',
      '53435-340',
      '(81) 98272-0027',
      'mcldhy@gmail.com',
      'linkedin.com/in/matheus-chaves',
      'github.com/matheuschaves',
      'Atuar como Auxiliar Administrativo...'
    ]);
    const pessoa1Id = pessoa1Result.rows[0].id;

    // Formações - Matheus
    await pool.query(`
      INSERT INTO formacao (pessoa_id, curso, instituicao, inicio, fim)
      VALUES ($1, $2, $3, $4, $5)
    `, [pessoa1Id, 'Tecnólogo em Sistemas para Internet', 'Universidade Católica de Pernambuco', 'fev 2024', 'jun 2026']);

    await pool.query(`
      INSERT INTO formacao (pessoa_id, curso, instituicao, inicio, fim)
      VALUES ($1, $2, $3, $4, $5)
    `, [pessoa1Id, 'Técnico em Análise e Desenvolvimento de Sistemas', 'Escola Técnica Estadual Porto Digital', 'fev 2021', 'dez 2023']);

    // Experiência - Matheus
    const exp1Result = await pool.query(`
      INSERT INTO experiencia (pessoa_id, cargo, empresa, inicio, fim, descricao)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [pessoa1Id, 'Jovem Aprendiz - Marketing', 'Colégio de Santa Catarina', 'fev 2025', 'atual', 'Criação de conteúdo para redes sociais e suporte administrativo']);

    const exp1Id = exp1Result.rows[0].id;

    // Ferramentas utilizadas - Matheus
    await pool.query('INSERT INTO ferramenta_utilizada (experiencia_id, nome) VALUES ($1, $2)', [exp1Id, 'Capcut']);
    await pool.query('INSERT INTO ferramenta_utilizada (experiencia_id, nome) VALUES ($1, $2)', [exp1Id, 'Adobe Lightroom']);
    await pool.query('INSERT INTO ferramenta_utilizada (experiencia_id, nome) VALUES ($1, $2)', [exp1Id, 'Canva']);

    // Habilidades - Matheus
    const habilidades1 = ['Python', 'Java', 'Spring Boot', 'JavaScript', 'Next.js', 'SQL', 'Linux', 'Fotografia', 'Marketing'];
    for (const habilidade of habilidades1) {
      await pool.query('INSERT INTO habilidade (pessoa_id, nome) VALUES ($1, $2)', [pessoa1Id, habilidade]);
    }

    // Soft Skills - Matheus
    await pool.query('INSERT INTO softskill (pessoa_id, descricao) VALUES ($1, $2)', [pessoa1Id, 'Trabalho em equipe']);
    await pool.query('INSERT INTO softskill (pessoa_id, descricao) VALUES ($1, $2)', [pessoa1Id, 'Comunicação clara']);
    await pool.query('INSERT INTO softskill (pessoa_id, descricao) VALUES ($1, $2)', [pessoa1Id, 'Organização']);

    // Conhecimentos - Matheus
    await pool.query('INSERT INTO conhecimento (pessoa_id, curso, instituicao, ano) VALUES ($1, $2, $3, $4)', [pessoa1Id, 'Change the Game 3ª Edição', 'Google Play', '2021']);
    await pool.query('INSERT INTO conhecimento (pessoa_id, curso, instituicao, ano) VALUES ($1, $2, $3, $4)', [pessoa1Id, 'Prazer, Arte!', 'Instituto Memaker', '2022']);

    // Pessoa 2 - Exemplo
    const pessoa2Result = await pool.query(`
      INSERT INTO pessoa (nome, endereco, cidade, estado, cep, telefone, email, linkedin, github, objetivo_profissional)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `, [
      'Maria Silva Santos',
      'Av. Boa Viagem, 500',
      'Recife',
      'PE',
      '51021-000',
      '(81) 99999-8888',
      'maria.silva@email.com',
      'linkedin.com/in/maria-silva',
      'github.com/mariasilva',
      'Desenvolver soluções inovadoras como Desenvolvedora Full Stack'
    ]);
    const pessoa2Id = pessoa2Result.rows[0].id;

    // Formações - Maria
    await pool.query('INSERT INTO formacao (pessoa_id, curso, instituicao, inicio, fim) VALUES ($1, $2, $3, $4, $5)', 
      [pessoa2Id, 'Bacharelado em Ciência da Computação', 'Universidade Federal de Pernambuco', '2018', '2022']);

    // Experiência - Maria
    const exp2Result = await pool.query(`
      INSERT INTO experiencia (pessoa_id, cargo, empresa, inicio, fim, descricao)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [pessoa2Id, 'Desenvolvedora Full Stack', 'Tech Solutions Ltda', 'jan 2023', 'atual', 'Desenvolvimento de aplicações web e mobile utilizando React e Node.js']);

    const exp2Id = exp2Result.rows[0].id;

    // Ferramentas utilizadas - Maria
    await pool.query('INSERT INTO ferramenta_utilizada (experiencia_id, nome) VALUES ($1, $2)', [exp2Id, 'React']);
    await pool.query('INSERT INTO ferramenta_utilizada (experiencia_id, nome) VALUES ($1, $2)', [exp2Id, 'Node.js']);
    await pool.query('INSERT INTO ferramenta_utilizada (experiencia_id, nome) VALUES ($1, $2)', [exp2Id, 'PostgreSQL']);

    // Habilidades - Maria
    const habilidades2 = ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'];
    for (const habilidade of habilidades2) {
      await pool.query('INSERT INTO habilidade (pessoa_id, nome) VALUES ($1, $2)', [pessoa2Id, habilidade]);
    }

    // Soft Skills - Maria
    await pool.query('INSERT INTO softskill (pessoa_id, descricao) VALUES ($1, $2)', [pessoa2Id, 'Liderança']);
    await pool.query('INSERT INTO softskill (pessoa_id, descricao) VALUES ($1, $2)', [pessoa2Id, 'Resolução de problemas']);

    // Conhecimentos - Maria
    await pool.query('INSERT INTO conhecimento (pessoa_id, curso, instituicao, ano) VALUES ($1, $2, $3, $4)', 
      [pessoa2Id, 'Certificação AWS Cloud Practitioner', 'Amazon Web Services', '2023']);

    console.log('Dados de seed inseridos com sucesso!');
    console.log(`2 pessoas cadastradas (IDs: ${pessoa1Id}, ${pessoa2Id})`);
    process.exit(0);
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    process.exit(1);
  }
};

seedData();

