const pool = require('../config/database');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pessoa ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pessoa WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { nome, endereco, cidade, estado, cep, telefone, email, linkedin, github, objetivo_profissional } = req.body;
    
    const result = await pool.query(
      `INSERT INTO pessoa (nome, endereco, cidade, estado, cep, telefone, email, linkedin, github, objetivo_profissional)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [nome, endereco, cidade, estado, cep, telefone, email, linkedin, github, objetivo_profissional]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, endereco, cidade, estado, cep, telefone, email, linkedin, github, objetivo_profissional } = req.body;
    
    const result = await pool.query(
      `UPDATE pessoa 
       SET nome = $1, endereco = $2, cidade = $3, estado = $4, cep = $5, 
           telefone = $6, email = $7, linkedin = $8, github = $9, 
           objetivo_profissional = $10, updated_at = CURRENT_TIMESTAMP
       WHERE id = $11
       RETURNING *`,
      [nome, endereco, cidade, estado, cep, telefone, email, linkedin, github, objetivo_profissional, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM pessoa WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    
    res.json({ message: 'Pessoa removida com sucesso', pessoa: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};

