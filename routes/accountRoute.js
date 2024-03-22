const express = require("express");
const router = express.Router();
const utilities = require("../utilities");
const accountController = require("../controllers/accController");

router.get("/login", accountController.buildLogin);

router.get("/register", accountController.buildRegister);

router.post(
  "/register",
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;
