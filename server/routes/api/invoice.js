const express = require("express");
const router = express.Router();
const invoiceController = require("../../controllers/invoiceController");

router
  .route("/")

  .post(invoiceController.createInvoice);

module.exports = router;
