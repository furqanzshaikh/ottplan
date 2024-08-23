const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");


router.post("/addrole", roleController.createRole);


router.get("/all-roles", roleController.getAllRoles);


router.get("/get-role/:id", roleController.getRoleById);


router.patch("/update-role/:id", roleController.updateRole);


router.delete("/delete-role/:id", roleController.deleteRole);

module.exports = router;
