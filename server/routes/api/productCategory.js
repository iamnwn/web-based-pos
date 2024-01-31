const express = require("express");
const router = express.Router();
const productCategoryController = require("../../controllers/productCategoryController");

router
  .route("/")

  .post(productCategoryController.createProductCategory);
router.route("/data").get(productCategoryController.getProductCategories);

module.exports = router;
