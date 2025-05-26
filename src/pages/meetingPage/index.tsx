import React, { useEffect, useState } from "react";
import { useSearchParams, Navigate, useNavigate } from "react-router-dom";
import { useMeetings, type IMeeting } from "../../contexts/meetings";
import Avatar from "../../components/avatar";
import styles from "./meeting-page.module.scss";
import WidthContainer from "../../components/WidthContainer";
import TopicsTimer from "../../components/topicsTimer";
import ContainerWithTitle from "../../components/containerWithTitle";
import type { IParticipant } from "../../contexts/participants";
import HomeIcon from "../../components/homeIcon";

export interface IAction {
  description: string;
  assigned: IParticipant | undefined;
}

export interface IFeedback {
  feedback: string;
  assigned: IParticipant | undefined;
}

const MeetingPage: React.FC = () => {
  const [notes, setNotes] = useState("")
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get("id");
  const { getMeetingById } = useMeetings();
  const [decision, setDecision] = useState<string>("");
  const [decisions, setDecisions] = useState<string[]>([]);

  const [meeting, setMeeting] = useState<IMeeting | undefined>(undefined);
  const [action, setAction] = useState<IAction>({
    description: "",
    assigned: meeting?.participants[0] || undefined,
  });
  const [actions, setActions] = useState<IAction[]>([]);

  const [feedback, setFeedback] = useState<IFeedback>({
    feedback: "",
    assigned: meeting?.participants[0] || undefined,
  });
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

  if (!meetingId) {
    return <Navigate to="/" replace />;
  }
  useEffect(() => {
    const fetchMeeting = async () => {
      const searchedMeeting = await getMeetingById(meetingId);
      setMeeting(searchedMeeting);
      setAction({ ...action, assigned: searchedMeeting?.participants[0] });
      setFeedback({ ...feedback, assigned: searchedMeeting?.participants[0] });
    };
    fetchMeeting();
  }, [getMeetingById, meetingId]);
  const navigate = useNavigate();
  if (!meeting) {
    return (
      <div className={styles.notFound}>
        <h2>Reunião não encontrada</h2>
        <p>ID: {meetingId}</p>
      </div>
    );
  }

  const handleFinish = async (timeStamp: number) => {
    try {
      const response = await fetch("http://localhost:4000/finishMeeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingId: meeting!.id,
          duration: timeStamp,
          notes,
          decision: decisions,
          actions,
          feedbacks,
        }),
      });
      const { id: finishId } = await response.json();
      navigate(`/finish?id=${finishId}`);
    } catch (err) {
      console.error("Erro ao finalizar:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "72px",
      }}
    >
      <HomeIcon/>
      <header style={{ marginTop: "132px" }}>
        <TopicsTimer handleFinish={handleFinish} topics={meeting.topics} />
      </header>
      <WidthContainer containerStyles={{ flexDirection: "row", gap: "24px" }}>
        <div className={styles.meetingBody}>
          <ContainerWithTitle isLarge title="Anotações">
            <textarea placeholder="Anotações sobre a Daily..." value={notes} onChange={(e)=>{
              setNotes(e.target.value)
            }} className={styles.notes} name="" id=""></textarea>
          </ContainerWithTitle>
          <ContainerWithTitle isLarge title="Decisões">
            <div className={styles.decisionContainer}>
              <input
                value={decision}
                onChange={(e) => {
                  setDecision(e.target.value);
                }}
                type="text"
              />
              <button
                onClick={() => {
                  if (decision.trim() === "") return;
                  setDecisions([...decisions, decision]);
                  setDecision("");
                }}
              >
                Adicionar
              </button>
            </div>
            <ul className={styles.decisions}>
              {decisions.map((item, key) => {
                return (
                  <li key={key}>
                    <span>{item}</span>
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        width: "32px",
                        height: "32px",
                      }}
                      onClick={() => {
                        const newDecisions = [...decisions];
                        newDecisions.splice(key, 1);
                        setDecisions(newDecisions);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                );
              })}
            </ul>
          </ContainerWithTitle>
          <ContainerWithTitle isLarge title="Ações">
            <ul className={styles.actions}>
              {actions.map((item, key) => {
                return (
                  <li key={key}>
                    <span>
                      <b>{item.description}</b>{" "}
                      <i
                        style={{ color: "#64748B" }}
                      >{`(atribuído a ${item.assigned?.name})`}</i>
                    </span>
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        width: "32px",
                        height: "32px",
                      }}
                      onClick={() => {
                        const newActions = [...actions];
                        newActions.splice(key, 1);
                        setActions(newActions);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className={styles.actionsInputContainer}>
              <input
                value={action.description}
                onChange={(e) => {
                  setAction({
                    description: e.target.value,
                    assigned: action.assigned,
                  });
                }}
                type="text"
              />
              <span>Atribuir a...</span>
              <select
                name=""
                id=""
                value={action.assigned?.id}
                onChange={(e) => {
                  const selectedParticipant = meeting.participants.find(
                    (p) => p.id === e.target.value
                  );

                  setAction({
                    ...action,
                    assigned: selectedParticipant,
                  });
                }}
              >
                {meeting.participants.map(
                  (participant: IParticipant, key: number) => {
                    return (
                      <option key={key} value={participant.id}>
                        {participant.name}
                      </option>
                    );
                  }
                )}
              </select>
              <button
                onClick={() => {
                  if (action.description.trim() === "") return;
                  setActions([...actions, action]);
                  setAction({ description: "", assigned: action.assigned });
                }}
              >
                Adicionar
              </button>
            </div>
          </ContainerWithTitle>
        </div>
        <div className={styles.meetingAside}>
          <ContainerWithTitle title="Participantes">
            <ul className={styles.participantsContainer}>
              {meeting.participants.map(
                (participant: IParticipant, key: number) => {
                  return (
                    <li className={styles.participantItem} key={key}>
                      <div className={styles.participantInfos}>
                        <Avatar
                          alt={participant.name}
                          imgSrc={participant.imageSrc}
                        />
                        <span>{participant.name}</span>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </ContainerWithTitle>
          <ContainerWithTitle title="Feedback">
            <div
              className={`${styles.actionsInputContainer} ${styles.feedbackInputContainer}`}
            >
              <input
                placeholder="Digite aqui seu feedback"
                value={feedback.feedback}
                onChange={(e) => {
                  setFeedback({
                    feedback: e.target.value,
                    assigned: feedback.assigned,
                  });
                }}
                type="text"
              />
              <div className={styles.feedbackSelectContainer}>
                <span>Atribuir a...</span>
                <select
                  name=""
                  id=""
                  value={feedback.assigned?.id}
                  onChange={(e) => {
                    const selectedParticipant = meeting.participants.find(
                      (p) => p.id === e.target.value
                    );

                    setFeedback({
                      ...feedback,
                      assigned: selectedParticipant,
                    });
                  }}
                >
                  {meeting.participants.map(
                    (participant: IParticipant, key: number) => {
                      return (
                        <option key={key} value={participant.id}>
                          {participant.name}
                        </option>
                      );
                    }
                  )}
                </select>
                <button
                  onClick={() => {
                    if (feedback.feedback.trim() === "") return;
                    setFeedbacks([...feedbacks, feedback]);
                    setFeedback({ feedback: "", assigned: feedback.assigned });
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
            <ul className={styles.feedbacks}>
              {feedbacks.map((item, key) => {
                return (
                  <li key={key}>
                    <span>
                      <b
                        
                      >{`Feedback para ${item.assigned?.name}: `}</b>
                      <i style={{ color: "#64748B" }}>"{item.feedback}"</i>
                    </span>
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        width: "32px",
                        height: "32px",
                      }}
                      onClick={() => {
                        const newFeedbacks = [...feedbacks];
                        newFeedbacks.splice(key, 1);
                        setFeedbacks(newFeedbacks);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                );
              })}
            </ul>
          </ContainerWithTitle>
         
        </div>
      </WidthContainer>
    </div>
  );
};

export default MeetingPage;
