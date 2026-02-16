const express = require('express');
const router = express.Router();
const CoursesController = require('../controllers/coursesController');

router.get('/', (CoursesController.get));

router.post('/', (CoursesController.create));
router.post('/enrollStudent', (CoursesController.assignStudent
));
  
router.route('/:id')
  .get((CoursesController.getDetails))
  .put((CoursesController.update))
  .delete((CoursesController.delete));

module.exports = router;
