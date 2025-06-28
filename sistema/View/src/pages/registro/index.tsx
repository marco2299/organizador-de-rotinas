import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mostrarAviso, setMostrarAviso] = useState(false);

  const router = useRouter();

  const handleCadastro = async () => {
    try {
      const response = await fetch("http://localhost:3001/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: firstName + " " + lastName,
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        router.push("/login");
      } else {
        alert(data.erro || "Erro ao cadastrar.");
      }
    } catch (error) {
      alert("Erro na conexão com o servidor.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen relative w-full bg-[#90DDF0] overflow-hidden">
      {/* Lado esquerdo com degradê */}

      {/* Bolha azul clara */}
      <div
        className="absolute opacity-70 blur-[76.5px]"
        style={{
          width: "40vw",
          height: "40vw",
          left: "-20vw",
          top: "50vh",
          background: "#90DDF0",
          boxShadow: "153px 153px 153px rgba(0,0,0,0.25)",
        }}
      ></div>

      {/* Bolha roxa*/}
      <div
        className="absolute opacity-40 blur-[76.5px]"
        style={{
          width: "35vw",
          height: "35vw",
          left: "-18vw",
          top: "-10vh",
          background: "#6C63FF",
          boxShadow: "153px 153px 153px rgba(0,0,0,0.25)",
        }}
      ></div>

      {/* bolha escura*/}
      <div
        style={{
          width: 538.3,
          height: 645.44,
          left: 118,
          top: 147,
          position: "absolute",
          opacity: 0.4,
          background: "#0A090C",
          boxShadow: "153px 153px 153px ",
          filter: "blur(76.50px)",
        }}
      />
      <div className="h-screen flex items-center justify-center relative">
        <Image
          src="/mulher-calendario.png"
          alt="Mulher com calendário"
          width={300}
          height={300}
          className="w-2/3 max-w-sm object-contain"
        />
      </div>

      {/* Lado direito e formulário de cadastro */}

      <div className="direitaRegistro">
        <div>
          <form className="form">
            {/* Boas vindas e etc*/}

            <div
              style={{
                paddingTop: "10%",
                paddingLeft: "20%",
                paddingRight: "20%",
                width: "100%",
                position: "relative",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  paddingBlockEnd: "5%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    color: "#0A090C",
                    fontSize: 23,
                    fontFamily: "Inter",
                    fontWeight: "700",
                    wordWrap: "break-word",
                    paddingBlockEnd: "2%",
                  }}
                >
                  Boas-vindas!
                </div>
                <div
                  style={{
                    width: "100%",
                    color: "#6B6871",
                    fontSize: 17,
                    fontFamily: "Inter",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  Registre-se para começar a melhorar a sua rotina
                </div>
              </div>

              {/* Linha com nome e sobrenome */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "12px", //espaçamento entre os campos
                  paddingBlockEnd: "2%",
                }}
              >
                {/* Nome */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      height: 48,
                      background: "#F0EDEE",
                      borderRadius: 8,
                      outline: "1px #0A090C solid",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Nome"
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: 16,
                        fontFamily: "Inter",
                        fontWeight: 700,
                        color: "#787878",
                      }}
                    />
                  </div>
                </div>

                {/* Sobrenome */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      height: 48,
                      background: "#F0EDEE",
                      borderRadius: 8,
                      outline: "1px #0A090C solid",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Sobrenome"
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        fontSize: 16,
                        fontFamily: "Inter",
                        fontWeight: 700,
                        color: "#787878",
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Email */}
              <div style={{ flex: 1, paddingBlock: 15 }}>
                <div
                  style={{
                    height: 48,
                    background: "#F0EDEE",
                    borderRadius: 8,
                    outline: "1px #0A090C solid",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: 16,
                      fontFamily: "Inter",
                      fontWeight: 700,
                      color: "#787878",
                    }}
                  />
                </div>
              </div>
              {/* Senha */}
              <div style={{ flex: 1, paddingBlockEnd: "2%" }}>
                <div
                  style={{
                    height: 48,
                    background: "#F0EDEE",
                    borderRadius: 8,
                    outline: "1px #0A090C solid",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="senha"
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontSize: 16,
                      fontFamily: "Inter",
                      fontWeight: 700,
                      color: "#787878",
                    }}
                  />
                </div>
              </div>
            </div>
          </form>

          {/*Botão de cadastrar */}
          <div
            style={{
              marginLeft: "25%",
              marginTop: "1%",
              width: "50%",
              height: "100%",
              padding: 10,
              background: "#362FA6",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              display: "inline-flex",
            }}
          >
            <div>
              <div>
                <button
                  onClick={handleCadastro}
                  type="submit"
                  style={{
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    color: "#F0EDEE",
                    fontSize: 17,
                    fontFamily: "Inter",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  Registrar-se
                </button>
              </div>
            </div>
          </div>
          {/*Entrar*/}
          <div
            style={{
              marginTop: "2%",
              color: "#787878",
              fontSize: 14,
              fontFamily: "Inter",
              fontWeight: "700",
              wordWrap: "break-word",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            Já possui uma conta?
            <div
              style={{
                marginLeft: "0.5%",
                color: "#362FA5",
                fontSize: 14,
                fontFamily: "Inter",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              <Link rel="stylesheet" href={{ pathname: "/login" }}>
                Entrar
              </Link>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
