const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");

router
  .route("/")

  .post(productController.createProduct);
router.route("/data").get(productController.getProductData);
router.route("/id").put(productController.updateProduct);

module.exports = router;
