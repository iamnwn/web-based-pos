const express = require("express");
const router = express.Router();
const customerController = require("../../controllers/customerController");
const validationMiddleware = require("../../middleware/validationMiddleware");
const customerValidation = require("../../validations/customerValidation");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(customerController.getAllCustomer)
  .post(
    validationMiddleware(customerValidation.customerSchema),
    customerController.createCustomer
  );

router
  .route("/data")
  .get(
    verifyRoles(["admin", "manager", "salesmen"]),
    customerController.getCustomersData
  );
router
  .route("/:id")
  .get(customerController.getCustomer)
  .put(
    validationMiddleware(customerValidation.updateSchema),
    customerController.updateCustomer
  )
  .delete(customerController.deleteCustomer);

module.exports = router;
