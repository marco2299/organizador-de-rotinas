import express from "express";
import dotenv from "dotenv";

// importe a rota de login (ajustado para ESModules)
import loginRouter from "./routes/login.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// ⬇️ Aqui está o que faltava: conectar a rota de login
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
