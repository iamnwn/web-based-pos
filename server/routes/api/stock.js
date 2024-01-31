const express = require("express");
const router = express.Router();
const stockController = require("../../controllers/stockController");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/").post(stockController.createStock);
// router.route("/:id").put(stockController.updateStock);

router.route("/data").get(stockController.getStockData);

module.exports = router;
