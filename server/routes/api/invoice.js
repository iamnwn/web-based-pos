const express = require("express");
const router = express.Router();
const invoiceController = require("../../controllers/invoiceController");

router
  .route("/")

  .post(invoiceController.createInvoice);

router.route("/data").get(invoiceController.getInvoiceData);

module.exports = router;
