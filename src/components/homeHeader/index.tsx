import React from "react";

const HomeHeader = ()=>{

    return(
         <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100px",
        width: "100%",
        backgroundColor: "#F8FAFC",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
       
        }}>
        <h1 style={{
          fontSize: "50px",
          color: "#1E293B",
          marginBottom: "4px",
        }}>dailynote</h1>
        <span
          style={{
            fontSize: "16px",
            color: "#64748B",
            fontWeight: "400",
          }}
        >Como vão as dailys hoje?</span>
        </div>
        <input type="text" name="" placeholder="Busque por reuniões ou tópicos" id="" style={{
          backgroundColor: "#fff",
          border: "1px solid #E2E8F0",
          fontSize: "16px",
          padding: "12px 17px",
          color: "#999999",
          borderRadius: "8px",
          width: "300px",
          height: "44px",
        }} />
        <a href="/nova-reuniao">Nova Reunião</a>
        <style>
          {`
            
            a:hover{
              color: #FFF;
            }
          `}
        </style>
      </div>
    )
}

export default HomeHeader