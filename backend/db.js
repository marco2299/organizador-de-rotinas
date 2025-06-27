// db.js
const { Pool } = require("pg");

// Configuração para conectar ao PostgreSQL local
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Edcba54321",
  port: 5432,
});

module.exports = pool;
