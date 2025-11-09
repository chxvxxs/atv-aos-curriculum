const express = require('express');
const router = express.Router();
const formacaoController = require('../controllers/formacaoController');

router.get('/', formacaoController.getAll);
router.get('/:id', formacaoController.getById);
router.post('/', formacaoController.create);
router.put('/:id', formacaoController.update);
router.delete('/:id', formacaoController.remove);

module.exports = router;

