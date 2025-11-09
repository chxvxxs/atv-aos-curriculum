const pool = require('../config/database');

const getAll = async (req, res) => {
  try {
    const { pessoa_id } = req.query;
    let query = 'SELECT * FROM habilidade';
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
    const result = await pool.query('SELECT * FROM habilidade WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Habilidade não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { pessoa_id, nome } = req.body;
    
    const result = await pool.query(
      `INSERT INTO habilidade (pessoa_id, nome)
       VALUES ($1, $2)
       RETURNING *`,
      [pessoa_id, nome]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    
    const result = await pool.query(
      `UPDATE habilidade 
       SET nome = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [nome, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Habilidade não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM habilidade WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Habilidade não encontrada' });
    }
    
    res.json({ message: 'Habilidade removida com sucesso', habilidade: result.rows[0] });
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

