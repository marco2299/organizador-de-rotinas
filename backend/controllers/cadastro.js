// controllers/cadastroController.js
const bcrypt = require("bcrypt");
const { criarUsuario } = require("../models/cadastro/cadastroModel");

async function cadastrar(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    const usuario = await criarUsuario(nome, email, senhaHash);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
}

module.exports = { cadastrar };
