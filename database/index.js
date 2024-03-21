const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * SSL/TLS configuration based on the environment
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
    // SSL configuration - enable SSL/TLS
    ssl: {
      rejectUnauthorized: true, // Enforces SSL certificate verification
    },
  });

  // Exporting the pool for use in other modules
  module.exports = pool;
}
