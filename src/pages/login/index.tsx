import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WidthContainer from "../../components/WidthContainer";
import styles from './login.module.scss';
import ContainerWithTitle from "../../components/containerWithTitle";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <WidthContainer>
        <div className={styles.loginContainer}>
        <h1>dailynote</h1>
        <ContainerWithTitle title="Login">
      
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit">Entrar</button>
        </form>
        <p>
            Não tem conta?{" "}<a href="/register">Cadastre-se</a>
        </p>
        </ContainerWithTitle>
        
        </div>
    </WidthContainer>
  );
}
