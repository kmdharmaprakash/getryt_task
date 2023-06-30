const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController");
const validator = require("../helpers/validator");

router.post('/registerEmployee', validator.validate('createEmployee'), EmployeeController.registerEmployee);
router.post('/loginEmployee', EmployeeController.loginEmployee);
router.get("/viewOneEmployee", EmployeeController.viewEmployee);
router.get("/viewAllEmployees", EmployeeController.viewAllEmployee);
router.put("/updateEmployee", EmployeeController.updateEmployee);
router.delete("/deleteEmployee", EmployeeController.deleteEmployee);

module.exports = router;