import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WidthContainer from "../../components/WidthContainer";
import styles from "./register.module.scss";
import ContainerWithTitle from "../../components/containerWithTitle";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <WidthContainer>
      <div className={styles.registerContainer}>
        <h1>dailynote</h1>
        <ContainerWithTitle title="Cadastro">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Usuário" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Repita o Email"
              required

            />
            
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Repita a Senha"
             
              required
            />
           
            <button type="submit">Cadastrar</button>
          </form>
           <p>
            Já possui uma conta?{" "}<a href="/login">Fazer login</a>
        </p>
        </ContainerWithTitle>
      </div>
    </WidthContainer>
  );
}
