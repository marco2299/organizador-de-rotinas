// routes/cadastroRoutes.js
const express = require("express");
const { cadastrar } = require("../controllers/cadastro");

const router = express.Router();

router.post("/", cadastrar);

module.exports = router;
