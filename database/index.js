const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */

let pool;

if (process.env.NODE_ENV === "development") {
  // For development environment
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // SSL configuration - disable SSL/TLS for local development
    ssl: {
      rejectUnauthorized: false, // Disables SSL certificate verification
    },
  });

  // Added for troubleshooting queries during development
  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params);
        console.log("executed query", { text });
        return res;
      } catch (error) {
        console.error("error in query", { text });
        throw error;
      }
    },
  };
} else {
  // For production environment and other environments
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // No SSL configuration provided, relying on default SSL/TLS behavior
  });

  // Exporting the pool for use in other modules
  module.exports = pool;
}
