const express = require('express');
const router = express.Router();
const conhecimentoController = require('../controllers/conhecimentoController');

router.get('/', conhecimentoController.getAll);
router.get('/:id', conhecimentoController.getById);
router.post('/', conhecimentoController.create);
router.put('/:id', conhecimentoController.update);
router.delete('/:id', conhecimentoController.remove);

module.exports = router;

