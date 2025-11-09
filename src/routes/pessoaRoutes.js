const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');

router.get('/', pessoaController.getAll);
router.get('/:id', pessoaController.getById);
router.post('/', pessoaController.create);
router.put('/:id', pessoaController.update);
router.delete('/:id', pessoaController.remove);

module.exports = router;

