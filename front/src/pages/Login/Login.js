import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Importando o contexto de autenticação
import { useNavigate } from "react-router-dom"; // Para redirecionamento
import "bootstrap/dist/css/bootstrap.min.css";
import { axiosInstance } from "../../api/axiosInstance";
import construcao from "../../images/construcao.jpg";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth(); // Pegando a função de login do contexto
  const navigate = useNavigate(); // Para redirecionar após o login

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: usuario,
      password: senha
    }
    
    if (usuario && senha) {
      axiosInstance.post('http://localhost:8080/login', data)
        .then((response) => {
          const token = response.data.access_token;
          // console.log(response.data)
          login(token);
          navigate("/emprestimo"); 
        })
        .catch((error) => {
          console.log("deu errado", error);
        });
    } else {
      alert("Usuário ou senha inválidos!");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${construcao})`, backgroundSize: "cover", height: "100vh" }}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
            <h2 className="text-center">Login</h2>
            <form onSubmit={handleLogin}>
              {/* Campo Usuário */}
              <div className="mb-3">
                <label className="form-label">Usuário</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite seu usuário"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  />
              </div>

              {/* Campo Senha */}
              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  />
              </div>

              {/* Botão de Login */}
              <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>
          </div>
      </div>
    </div>
  );
};

export default Login;
