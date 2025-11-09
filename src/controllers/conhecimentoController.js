const pool = require('../config/database');

const getAll = async (req, res) => {
  try {
    const { pessoa_id } = req.query;
    let query = 'SELECT * FROM conhecimento';
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
    const result = await pool.query('SELECT * FROM conhecimento WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conhecimento não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { pessoa_id, curso, instituicao, ano } = req.body;
    
    const result = await pool.query(
      `INSERT INTO conhecimento (pessoa_id, curso, instituicao, ano)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [pessoa_id, curso, instituicao, ano]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { curso, instituicao, ano } = req.body;
    
    const result = await pool.query(
      `UPDATE conhecimento 
       SET curso = $1, instituicao = $2, ano = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [curso, instituicao, ano, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conhecimento não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM conhecimento WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conhecimento não encontrado' });
    }
    
    res.json({ message: 'Conhecimento removido com sucesso', conhecimento: result.rows[0] });
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

