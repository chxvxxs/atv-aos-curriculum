const express = require('express');
const router = express.Router();
const ferramentaUtilizadaController = require('../controllers/ferramentaUtilizadaController');

router.get('/', ferramentaUtilizadaController.getAll);
router.get('/:id', ferramentaUtilizadaController.getById);
router.post('/', ferramentaUtilizadaController.create);
router.put('/:id', ferramentaUtilizadaController.update);
router.delete('/:id', ferramentaUtilizadaController.remove);

module.exports = router;

