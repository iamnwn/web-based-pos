const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const passwordHash = require("../../middleware/passwordHash");
const validationMiddleware = require("../../middleware/validationMiddleware");
const userValidation = require("../../validations/userValidation");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(
    validationMiddleware(userValidation.userSchema),
    passwordHash,
    userController.createUser
  );
router.route("/data").get(userController.getUsersData);
router
  .route("/:id")
  .get(userController.getUser)
  .put(
    validationMiddleware(userValidation.updateSchema),
    userController.updateUser
  )
  .delete(userController.deleteUser);

module.exports = router;
