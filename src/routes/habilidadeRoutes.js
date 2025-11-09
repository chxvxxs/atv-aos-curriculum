const express = require('express');
const router = express.Router();
const habilidadeController = require('../controllers/habilidadeController');

router.get('/', habilidadeController.getAll);
router.get('/:id', habilidadeController.getById);
router.post('/', habilidadeController.create);
router.put('/:id', habilidadeController.update);
router.delete('/:id', habilidadeController.remove);

module.exports = router;

