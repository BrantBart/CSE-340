const utilities = require("../utilities/index");
const accountModel = require("../models/account-model");

/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  res.render("account/login", {
    title: "Login",
    nav,
  });
}

async function buildRegister(req, res, next) {
  try {
    let nav = await utilities.getNav();

    // Set flash message
    req.flash("notice", "This is a flash message.");

    // Render the registration page with flash message
    res.render("account/register", {
      title: "Register",
      nav,
    });
  } catch (error) {
    console.error("Error in buildRegister:", error);
    return res.status(500).send("Internal Server Error");
  }
}

/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  try {
    // Get navigation HTML
    let nav = await utilities.getNav();

    // Extract data from the request body
    const {
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    } = req.body;

    // Call the model function to register the account
    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password
    );

    if (regResult) {
      // Set flash message for successful registration
      req.flash(
        "success",
        `Congratulations, you're registered ${account_firstname}. Please log in.`
      );

      // Redirect to the login page
      return res.redirect("/account/login");
    } else {
      // Set flash message for failed registration
      req.flash("error", "Sorry, the registration failed.");

      // Render the registration page with error message
      return res.status(501).render("account/register", {
        title: "Registration",
        nav,
      });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error in registerAccount:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { buildLogin, buildRegister, registerAccount };
