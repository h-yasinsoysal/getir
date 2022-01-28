var express = require('express');
var router = express.Router();
const records = require('../controllers/records');

/* POST records */
router.route('/').post(records.getRecords);

module.exports = router;
