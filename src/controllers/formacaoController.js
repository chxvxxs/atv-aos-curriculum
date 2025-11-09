const pool = require('../config/database');

const getAll = async (req, res) => {
  try {
    const { pessoa_id } = req.query;
    let query = 'SELECT * FROM formacao';
    let params = [];
    
    if (pessoa_id) {
      query += ' WHERE pessoa_id = $1';
      params.push(pessoa_id);
    }
    
    query += ' ORDER BY id';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM formacao WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Formação não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { pessoa_id, curso, instituicao, inicio, fim } = req.body;
    
    const result = await pool.query(
      `INSERT INTO formacao (pessoa_id, curso, instituicao, inicio, fim)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [pessoa_id, curso, instituicao, inicio, fim]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { curso, instituicao, inicio, fim } = req.body;
    
    const result = await pool.query(
      `UPDATE formacao 
       SET curso = $1, instituicao = $2, inicio = $3, fim = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [curso, instituicao, inicio, fim, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Formação não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM formacao WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Formação não encontrada' });
    }
    
    res.json({ message: 'Formação removida com sucesso', formacao: result.rows[0] });
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

