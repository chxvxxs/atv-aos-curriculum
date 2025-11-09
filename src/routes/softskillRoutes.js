const express = require('express');
const router = express.Router();
const softskillController = require('../controllers/softskillController');

router.get('/', softskillController.getAll);
router.get('/:id', softskillController.getById);
router.post('/', softskillController.create);
router.put('/:id', softskillController.update);
router.delete('/:id', softskillController.remove);

module.exports = router;

