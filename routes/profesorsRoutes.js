const express = require('express');
const router = express.Router();
const profesorsController = require('../controllers/profesorsController');

router.get('/', (profesorsController.get));

router.post('/', (profesorsController.create));
  
router.route('/:id')
  .get((profesorsController.getDetails))
  .put((profesorsController.update))
  .delete((profesorsController.delete));

module.exports = router;
