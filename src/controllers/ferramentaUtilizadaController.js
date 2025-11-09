const pool = require('../config/database');

const getAll = async (req, res) => {
  try {
    const { experiencia_id } = req.query;
    let query = 'SELECT * FROM ferramenta_utilizada';
    let params = [];
    
    if (experiencia_id) {
      query += ' WHERE experiencia_id = $1';
      params.push(experiencia_id);
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
    const result = await pool.query('SELECT * FROM ferramenta_utilizada WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { experiencia_id, nome } = req.body;
    
    const result = await pool.query(
      `INSERT INTO ferramenta_utilizada (experiencia_id, nome)
       VALUES ($1, $2)
       RETURNING *`,
      [experiencia_id, nome]
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
      `UPDATE ferramenta_utilizada 
       SET nome = $1
       WHERE id = $2
       RETURNING *`,
      [nome, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM ferramenta_utilizada WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ferramenta não encontrada' });
    }
    
    res.json({ message: 'Ferramenta removida com sucesso', ferramenta: result.rows[0] });
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

