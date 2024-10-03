import { FaUser, FaLock } from "react-icons/fa";
import React from "react";
import { useState } from "react";
import "./styles.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // Impede que a página seja recarregada
    event.preventDefault();

    // Faz o console log das credenciais do usuário
    console.log("Dados de Login:", { username, password });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-field">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="recall-forget">
          <label>
            
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
