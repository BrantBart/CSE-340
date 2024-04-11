const express = require("express");
const router = express.Router();
const utilities = require("../utilities/index");
const accountController = require("../controllers/accController");
const regValidate = require("./regValidate");

router.get("/login", accountController.buildLogin);

router.get("/register", accountController.buildRegister);

router.post(
  "/register",
  utilities.handleErrors(accountController.registerAccount)
);

router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

module.exports = router;
