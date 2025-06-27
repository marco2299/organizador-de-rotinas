const bcrypt = require("bcrypt");
const { buscarUsuarioPorEmail } = require("../models/login/loginModel");

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
  }

  const usuario = await buscarUsuarioPorEmail(email);
  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(401).json({
      erro: "Senha incorreta",
    });
  }

  res.json({
    mensagem: "Login bem-sucedido",
    usuario: { id: usuario.id, nome: usuario.nome },
  });
}

module.exports = { login };
