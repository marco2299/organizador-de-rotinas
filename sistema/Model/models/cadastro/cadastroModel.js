// models/cadastroModel.js
const pool = require("../../db");

async function criarUsuario(nome, email, senha) {
  const query = `
    INSERT INTO Usuario (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email;
  `;
  const values = [nome, email, senha];

  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = { criarUsuario };
