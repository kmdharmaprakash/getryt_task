const express = require('express');
const router = express.Router();
const EmployeeRouter = require('../routes/EmployeeRoute');

router.use('/employee', EmployeeRouter)

module.exports = router;