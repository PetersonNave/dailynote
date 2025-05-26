import React, { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useMeetings, type IMeeting } from "../../contexts/meetings";
import Avatar from "../../components/avatar";
import styles from "./meeting-page.module.scss";
import WidthContainer from "../../components/WidthContainer";
import TopicsTimer from "../../components/topicsTimer";
import ContainerWithTitle from "../../components/containerWithTitle";
import type { IParticipant } from "../../contexts/participants";

const MeetingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get("id");
  const { getMeetingById } = useMeetings();
  const [decisions, setDecisions] = useState<string[]>(
    [
      "criar um quadro kanban",
      "computar as atividades",
      "trazer beneficios"
    ]
  )

  const [meeting, setMeeting] = useState<IMeeting|undefined>(undefined)

  if (!meetingId) {
    return <Navigate to="/" replace />;
  }
  useEffect(() => {
    const fetchMeeting = async () => {
      const searchedMeeting = await getMeetingById(meetingId);
      setMeeting(searchedMeeting);
    };
    fetchMeeting();
  }, [getMeetingById, meetingId]);

  if (!meeting) {
    return (
      <div className={styles.notFound}>
        <h2>Reunião não encontrada</h2>
        <p>ID: {meetingId}</p>
      </div>
    );
  }

  const totalDuration = meeting.topics.reduce((sum, t) => sum + t.duration, 0);

  return (
    <div style={{display: 'flex', flexDirection: "column", width: '100%', paddingBottom: "72px"}}>
    <header style={{marginBottom: '32px'}}>
      <TopicsTimer topics={meeting.topics}/>
    </header>
    <WidthContainer containerStyles={{flexDirection: 'row', gap: '24px'}}>
    <div className={styles.meetingBody}>
      <ContainerWithTitle isLarge title="Anotações">
        <textarea name="" id=""></textarea>
      </ContainerWithTitle>
      <ContainerWithTitle isLarge title="Decisões">
        <div className={styles.decisionContainer}>

        </div>
        <ul className={styles.decisions}>
          {
            decisions.map((item, key)=>{
              return(
                <li key={key}>
                  <span>
                    {item}
                    </span>
                       <button
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        width: "32px",
                        height: "32px"
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
              )
            })

          }
        </ul>
      </ContainerWithTitle>
      <ContainerWithTitle isLarge title="Ações">
        <ul className={styles.actionsContainer}>
          
        </ul>
      </ContainerWithTitle>
    </div>
    <div className={styles.meetingAside}>
      <ContainerWithTitle title="Participantes">
         <ul className={styles.participantsContainer}>
              {meeting.participants.map((participant: IParticipant, key: number) => {
                return (
                  <li className={styles.participantItem} key={key}>
                    <div className={styles.participantInfos}>
                      <Avatar alt={participant.name} imgSrc={participant.imageSrc}/>
                      <span>{participant.name}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
      </ContainerWithTitle>
       <ContainerWithTitle title="Feedback">
        <ul className={styles.participantsContainer}>
          <li></li>
        </ul>
      </ContainerWithTitle>
    </div>
    </WidthContainer>
     
    </div>
  
  );
};

export default MeetingPage;
