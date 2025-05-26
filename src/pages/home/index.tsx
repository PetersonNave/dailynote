import { useState } from "react";
import "../../App.css";
import HomeHeader from "../../components/homeHeader";

interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

function Home() {
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <HomeHeader/>
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
          }}>Upcoming Meetings</h2>
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
            <p>Frontend Team</p>
            <span>10:00 AM</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <span>8 participants</span>
              <button>Join</button>
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
            <p>Backend Team</p>
            <span>11:30 AM</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <span>6 participants</span>
              <button>Join</button>
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
            <p>Design Team</p>
            <span>02:00 PM</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <span>4 participants</span>
              <button>Join</button>
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
          }}>Recent Meetings</h2>
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
            <p><b>Product Syns</b></p>
            <span>Yesterday</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <span style={{
                color: "#3B82F6"
              }}>View Notes</span>
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
            <span>2 days ago</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
              <span style={{
                color: "#3B82F6"
              }}>View Notes</span>
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
            <span>3 days ago</span>

            </div>
            <div style={{display: "flex", flexDirection: "row", gap: "8px", alignItems: "center"}}>
             <span style={{
                color: "#3B82F6"
              }}>View Notes</span>
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
        }}>Notifications</h2>
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
            <p><b>Task Review Pending</b></p>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>Frontend sprint planning needs your review</i></span>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>2h ago</i></span>
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
            <p><b>Meeting Notes Due</b></p>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>Please complete notes from yesterday's standup</i></span>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>4h ago</i></span>
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
            <p><b>Task Review Pending</b></p>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>Frontend sprint planning needs your review</i></span>
            <span style={{color: "#64748B", fontSize: '12px'}}><i>5h ago</i></span>
            </div>
           
          </li>
       
         </ul>
      </div>
    </aside>
    </div>
    </div>
  
   
  );
}

export default Home;
