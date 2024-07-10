const express = require('express');
const citiesController = require('../controllers/citiesController');
const router = express.Router();

router.get('/departments', citiesController.getDepartament);
router.get('/departments/cities', citiesController.getCitiesByDepartment);

module.exports = router;
