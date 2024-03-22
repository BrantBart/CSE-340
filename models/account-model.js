const pool = require("../database/");

/* ***************************
 *  Get user by email
 * ************************** */
async function getUserByEmail(email) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.users WHERE email = $1`,
      [email]
    );
    return data.rows[0];
  } catch (error) {
    console.error("getUserByEmail error:", error);
    throw error;
  }
}

/* ***************************
 *  Create a new user
 * ************************** */
async function createUser(email, password) {
  try {
    const data = await pool.query(
      `INSERT INTO public.users (email, password) VALUES ($1, $2) RETURNING *`,
      [email, password]
    );
    return data.rows[0];
  } catch (error) {
    console.error("createUser error:", error);
    throw error;
  }
}

/* ***************************
 *  Verify user credentials
 * ************************** */
async function verifyUser(email, password) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.users WHERE email = $1 AND password = $2`,
      [email, password]
    );
    return data.rows[0];
  } catch (error) {
    console.error("verifyUser error:", error);
    throw error;
  }
}

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(
  account_firstname,
  account_lastname,
  account_email,
  account_password
) {
  try {
    const sql =
      "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
    return await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    ]);
  } catch (error) {
    console.error("registerAccount error:", error);
    throw error;
  }
}

module.exports = {
  getUserByEmail,
  createUser,
  verifyUser,
  registerAccount,
};
