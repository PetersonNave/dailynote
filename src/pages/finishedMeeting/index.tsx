import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import WidthContainer from "../../components/WidthContainer";
import styles from "./finishedMeeting.module.scss";
import ContainerWithTitle from "../../components/containerWithTitle";
import { useMeetings, type IMeeting } from "../../contexts/meetings";
import Avatar from "../../components/avatar";
import type { IParticipant } from "../../contexts/participants";
import type { IAction, IFeedback } from "../meetingPage";
import HomeIcon from "../../components/homeIcon";

interface IFinish {
  id: string;
  meetingId: string;
  duration: number;
  notes: string;
  decision: string[];
  actions: IAction[];
  feedbacks: IFeedback[];
  createdAt: string;
  meeting: IMeeting;
}

const FinishedMeeting = () => {
  const [search] = useSearchParams();
  const finishId = search.get("id");
  const [finish, setFinish] = useState<IFinish | null>(null);
  const { getMeetingById } = useMeetings();

  useEffect(() => {
    fetch(`http://localhost:4000/finishMeeting/${finishId}`)
      .then((res) => res.json())
      .then(async (data) => {
        // parse JSON fields
        data.decision = JSON.parse(data.decision);
        data.actions = JSON.parse(data.actions);
        data.feedbacks = JSON.parse(data.feedbacks);
        data.meeting = await getMeetingById(data.meetingId);
        setFinish(data);
      });
  }, [finishId]);

  const getNormalizedDate = () => {
    const date = new Date(finish?.createdAt ?? "");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getNormalizedHour = () => {
    const date = new Date(finish?.createdAt ?? "");

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    };
    return date.toLocaleTimeString("pt-BR", options);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link do relatório copiado para a área de transferência");
  };
  console.log(finish);
  if (!finish) return <div>Carregando...</div>;
  //  {(finish.decision as string[]).map((d, i) => <li key={i}>{d}</li>)}
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <HomeIcon/>
      <header style={{ display: "flex", width: "100%" }}>
        <WidthContainer
          containerStyles={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.headerLefSide}>
            <h1>Relatório da reunião</h1>
            <span>
              {getNormalizedDate()} • {getNormalizedHour()} • {finish.duration}{" "}
              minutos
            </span>
          </div>
          <div>
            <button onClick={handleCopyUrl}>Compartilhar relatório</button>
          </div>
        </WidthContainer>
      </header>
      <WidthContainer
        containerStyles={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          paddingBottom: "72px",
        }}
      >
        <div className={styles.summaryContainer}>
          <ContainerWithTitle isLarge title="Decisões tomadas">
            <ul className={styles.decisions}>
              {finish.decision.map((item, key) => {
                return (
                  <li key={key}>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </ContainerWithTitle>

          <ContainerWithTitle isLarge title="Ações definidas">
            <div className={styles.actionsStatusExample}>
                <span>Pendente</span>
                <span>Finalizada</span>
                <span>Em progresso</span>
            </div>
            <ul className={styles.actions}>
              {finish.actions.map((item, key) => {
                return (
                  <li key={key}>
                    <span>
                      <b>{item.description}</b>{" "}
                      <i
                        style={{ color: "#64748B" }}
                      >{`(atribuída a ${item.assigned?.name})`}</i>
                    </span>
                    <progress id="progress" value={`${key == 1 ? '100' : Math.random() * 100}`} max="100"></progress>
                  </li>
                );
              })}
            </ul>
          </ContainerWithTitle>

          <ContainerWithTitle isLarge title="Notas da reunião">
            <textarea
              readOnly
              value={finish.notes}
              className={styles.notes}
              name=""
              id=""
            ></textarea>
          </ContainerWithTitle>
        </div>
        <div className={styles.summaryAside}>
          <ContainerWithTitle title="Participantes">
            <ul className={styles.participantsContainer}>
              {finish.meeting.participants.map(
                (participant: IParticipant, key: number) => {
                  return (
                    <li className={styles.participantItem} key={key}>
                      <div className={styles.participantInfos}>
                        <Avatar
                          alt={participant.name}
                          imgSrc={participant.imageSrc}
                        />
                        <span>{participant.name}</span>
                        <span className={styles.participantStatus}>Presente</span>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </ContainerWithTitle>
          <ContainerWithTitle title="Feedbacks">
            <ul className={styles.feedbacks}>
              {finish.feedbacks.map((item, key) => {
                return (
                  <li key={key}>
                    <span>
                      <b>{`Feedback para ${item.assigned?.name}: `}</b>
                      <i style={{ color: "#64748B" }}>"{item.feedback}"</i>
                    </span>
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

export default FinishedMeeting;
