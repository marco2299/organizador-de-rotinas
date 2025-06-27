const pool = require("../../db"); // supondo que seu db.js exporta pool

async function buscarUsuarioPorEmail(email) {
  const result = await pool.query("SELECT * FROM Usuario WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

module.exports = { buscarUsuarioPorEmail };
