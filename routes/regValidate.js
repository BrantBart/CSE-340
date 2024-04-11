// Example validation library (you may use a different library or implement your own)

// Validation rules for login
const { body } = require("express-validator");

exports.loginRules = () => {
  return [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
    // Add more validation rules as needed
  ];
};

// Middleware to check login data
exports.checkLoginData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
