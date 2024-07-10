const express = require('express');
const genericController = require('../controllers/genericController');
const router = express.Router();

router.get('/gender', genericController.getGender);
router.get('/documentType', genericController.getDocumentType);
router.get('/reservationType', genericController.getReservationType);

module.exports = router;
