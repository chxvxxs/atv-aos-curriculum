require('dotenv').config();
const app = require('./app');
const pool = require('./config/database');

// Testar conexão com banco
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Banco de dados conectado:', res.rows[0].now);
});

// 🚀 Só roda o app.listen localmente
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`API disponível em http://localhost:${PORT}`);
  });
}

// ✅ Exporta o app para a Vercel usar
module.exports = app;
