const express = require("express");
const router = express.Router();
const empController = require("../controllers/empController");


router.post("/add-emp",  empController.addEmployee);
router.get("/all-emp",  empController.getEmployees);
router.get("/get-emp/:id",  empController.getEmployee);
router.patch("/update-emp/:id",  empController.updateEmployee);
router.delete("/delete-emp/:id",  empController.deleteEmployee);

module.exports = router;
