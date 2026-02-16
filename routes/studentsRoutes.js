const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.get('/', (studentsController.get));

router.post('/', (studentsController.create));


router.route('/:id')
  .get(studentsController.getDetails) 
  .put(studentsController.update) 
  .delete(studentsController.delete);

module.exports = router;
