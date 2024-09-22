const express = require("express");
const router = express.Router();
const clientController = require('../controllers/clientController')



router.post("/add-client",  clientController.createClient);
router.get("/all-clients",  clientController.getClients);
router.get("/get-client/:id",  clientController.getClientById);
router.patch("/update-client/:id",  clientController.updateClient);
router.delete("/delete-client/:id",  clientController.deleteClient);

module.exports = router;
