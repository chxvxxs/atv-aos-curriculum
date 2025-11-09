const pool = require('../config/database');

const getAll = async (req, res) => {
  try {
    const { pessoa_id } = req.query;
    let query = 'SELECT * FROM experiencia';
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
    const result = await pool.query('SELECT * FROM experiencia WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { pessoa_id, cargo, empresa, inicio, fim, descricao } = req.body;
    
    const result = await pool.query(
      `INSERT INTO experiencia (pessoa_id, cargo, empresa, inicio, fim, descricao)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [pessoa_id, cargo, empresa, inicio, fim, descricao]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { cargo, empresa, inicio, fim, descricao } = req.body;
    
    const result = await pool.query(
      `UPDATE experiencia 
       SET cargo = $1, empresa = $2, inicio = $3, fim = $4, descricao = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [cargo, empresa, inicio, fim, descricao, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM experiencia WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experiência não encontrada' });
    }
    
    res.json({ message: 'Experiência removida com sucesso', experiencia: result.rows[0] });
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

