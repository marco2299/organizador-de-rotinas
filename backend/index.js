import express from "express";
import dotenv from "dotenv";

import cadastroRouter from "./routes/cadastro.js";
import loginRouter from "./routes/login.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

app.use("/login", loginRouter);

app.use("/cadastro", cadastroRouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
