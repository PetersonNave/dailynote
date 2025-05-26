import { useState } from "react";
import "../../App.css";
import HomeHeader from "../../components/homeHeader";
import WidthContainer from "../../components/WidthContainer";

interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

function Home() {
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <WidthContainer>
      <HomeHeader/>

      </WidthContainer>
     <WidthContainer stylesInline={{paddingBottom: '72px'}}>
       <div style={{
      display: "flex",width: '100%',justifyContent: 'space-around'
    }}>                     
 <div style={{
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        borderRadius: "12px",

      }}>
        <div style={{
          display: "flex",
          width: '807px',
          height: "367px",
          padding: "24px",
          backgroundColor: "#fff",
          color: "#1f1f1f",
          flexDirection: "column",
          borderRadius: "12px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.05)",
          marginTop: "50px",
}}>
          <h2 style={{
            fontSize: "24px",
            color: "#1E293B",
            marginBottom: "4px",
          }}>Próximas reuniões</h2>
         <ul style={{listStyle: "none", padding: "0", display: "flex", flexDirection: "column", gap: "16px"}}>
          <li style={{
            display: "flex",
            width: "100%",
            height: "80px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "space-between",
            padding: "16px",
            }}>
            <div>
            <p>Time do Front-end</p>
            <span>Hoje, 10:00</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <span>8 participantes</span>
              <a href="/meeting?id=f8b456b7-8680-45b4-a945-47378c77d452">Entrar</a >
            </div>
          </li>
          <li style={{
            display: "flex",
            width: "100%",
            height: "80px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "space-between",
            padding: "16px",
            }}>
            <div>
            <p>Time do Back-end</p>
            <span>Hoje, 11:30</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <span>6 participantes</span>
              <a href="/meeting?id=4c057eee-3bbc-490b-8e1f-40e2a620bbd3">Entrar</a>
            </div>
          </li>
          <li style={{
            display: "flex",
            width: "100%",
            height: "80px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "space-between",
            padding: "16px",
            }}>
            <div>
            <p>Time de Design</p>
            <span>Hoje, 14:00</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <span>4 participantes</span>
              <a href="/meeting?id=1345ceba-6a84-46cd-8100-72dd984a3359">Entrar</a>
            </div>
          </li>
         </ul>
        </div>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        borderRadius: "12px",

      }}>
        <div style={{
          display: "flex",
          width: '807px',
          height: "367px",
          padding: "24px",
          backgroundColor: "#fff",
          color: "#1f1f1f",
          flexDirection: "column",
          borderRadius: "12px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.05)",
          marginTop: "50px",
}}>
          <h2 style={{
            fontSize: "24px",
            color: "#1E293B",
            marginBottom: "4px",
          }}>Reuniões recentes</h2>
         <ul style={{listStyle: "none", padding: "0", display: "flex", flexDirection: "column", gap: "16px"}}>
          <li style={{
            display: "flex",
            width: "100%",
            height: "80px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "space-between",
            padding: "16px",
            }}>
            <div>
            <p><b>Alinhamento semanal</b></p>
            <span>Ontem</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <a 
              href="/finish?id=ae3a25b5-7f52-45c5-be37-0f14eb1babe6"
              style={{
                
                color: "#3B82F6",
                background: 'none',
                paddingRight: '0px'
              }}>Ver resumo</a>
            </div>
          </li>
          <li style={{
            display: "flex",
            width: "100%",
            height: "80px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "space-between",
            padding: "16px",
            }}>
            <div>
            <p><b>Sprint Review</b></p>
            <span>2 dias atrás</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <a href="/finish?id=c5717679-46f3-4cba-952a-7967af6f213b" style={{
                color: "#3B82F6",
                background: 'none',
                paddingRight: '0px'
              }}>Ver resumo</a>
            </div>
          </li>
          <li style={{
            display: "flex",
            width: "100%",
            height: "80px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "space-between",
            padding: "16px",
            }}>
            <div>
            <p><b>Sprint Planning</b></p>
            <span>3 dias atrás</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
             <a href="/finish?id=e88af9bd-f753-4bc6-9a75-d00e886e4512" style={{
                color: "#3B82F6",
                background: 'none',
                paddingRight: '0px'
              }}>Ver resumo</a>
            </div>
          </li>
         </ul>
        </div>
      </div>
    </div>

    <aside style={{
      marginLeft: "50px",
      marginTop: "150px",
    }}>
      <div style={{
        color: "#000",
        backgroundColor: "#fff",
        borderRadius: "12px",
        width: "300px",
        height: "460px",
        padding: "16px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.05)"
      }}>
        <h2 style={{
          marginTop: "24px",
        }}>Notificações</h2>
           <ul style={{marginTop: '32px', listStyle: "none", padding: "0", display: "flex", flexDirection: "column", gap: "16px"}}>
          <li style={{
            display: "flex",
            width: "100%",
            height: "100px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "flex-start",
            alignItems: 'flex-start',
            padding: "16px",
            }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
            <p><b>Revisão de tarefas pendente</b></p>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>'Frontend sprint planning' precisa da sua revisão</i></span>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>2h atrás</i></span>
            </div>
           
          </li>
          <li style={{
            display: "flex",
            width: "100%",
            height: "100px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "flex-start",
            alignItems: 'flex-start',
            padding: "16px",
            }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
            <p><b>Notas da reunião...</b></p>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>Por favor, complete as notas da reunião passada</i></span>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>4h atrás</i></span>
            </div>
           
          </li>
          <li style={{
            display: "flex",
            width: "100%",
            height: "100px",
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            justifyContent: "flex-start",
            alignItems: 'flex-start',
            padding: "16px",
            }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
            <p><b>Revisão de tarefas pendente</b></p>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>'Frontend sprint planning' precisa da sua revisão</i></span>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>5h atrás</i></span>
            </div>
           
          </li>
       
         </ul>
      </div>
    </aside>
    </div>
     </WidthContainer>
    </div>
  
   
  );
}

export default Home;
