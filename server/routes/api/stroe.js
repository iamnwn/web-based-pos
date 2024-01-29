const express = require("express");
const router = express.Router();
const storesController = require("../../controllers/storesController");

router
  .route("/")
  .get(storesController.getAllStore)
  .post(storesController.createStore);
router
  .route("/:id")
  .put(storesController.updateStore)
  .delete(storesController.deleteStore);

router.route("/data").get(storesController.getStoresData);

module.exports = router;
