import { FaUser, FaLock } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/sessions", {
        login: username,
        password: password,
      });

      console.log("Resposta completa do backend: ", response);

      // Verifica se o status é 200 ou 201 e se há um token na resposta
      if (
        (response.status === 200 || response.status === 201) &&
        response.data.access_token
      ) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/dashboard");
        setErrorMessage(""); // Limpa a mensagem de erro
      } else {
        // Caso o login falhe, atualiza a mensagem de erro
        setErrorMessage("Login ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Atualiza a mensagem de erro se ocorrer um erro
      setErrorMessage("Login ou senha incorretos.");
    }
  };

  // useEffect para limpar a mensagem de erro após 5 segundos
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(""); // Limpa a mensagem de erro após 5 segundos
      }, 5000);

      // Limpa o timer caso o componente seja desmontado antes dos 5 segundos
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-field">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Login"
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
          <a href="#">Esqueceu sua senha?</a>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Exibe a mensagem de erro com o novo estilo */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
