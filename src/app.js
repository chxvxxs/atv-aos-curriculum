const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

// Importar rotas
const pessoaRoutes = require('./routes/pessoaRoutes');
const formacaoRoutes = require('./routes/formacaoRoutes');
const experienciaRoutes = require('./routes/experienciaRoutes');
const ferramentaUtilizadaRoutes = require('./routes/ferramentaUtilizadaRoutes');
const conhecimentoRoutes = require('./routes/conhecimentoRoutes');
const softskillRoutes = require('./routes/softskillRoutes');
const habilidadeRoutes = require('./routes/habilidadeRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/formacoes', formacaoRoutes);
app.use('/api/experiencias', experienciaRoutes);
app.use('/api/ferramentas-utilizadas', ferramentaUtilizadaRoutes);
app.use('/api/conhecimentos', conhecimentoRoutes);
app.use('/api/softskills', softskillRoutes);
app.use('/api/habilidades', habilidadeRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'API REST para Gerenciamento de Currículos',
    endpoints: {
      pessoas: '/api/pessoas',
      formacoes: '/api/formacoes',
      experiencias: '/api/experiencias',
      ferramentasUtilizadas: '/api/ferramentas-utilizadas',
      conhecimentos: '/api/conhecimentos',
      softskills: '/api/softskills',
      habilidades: '/api/habilidades'
    }
  });
});

// Middleware de tratamento de erros
app.use(errorHandler);

module.exports = app;

