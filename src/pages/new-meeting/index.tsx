import React, { useContext, useState } from "react";
import WidthContainer from "../../components/WidthContainer";
import styles from "./new-meeting.module.scss";
import ContainerWithTitle from "../../components/containerWithTitle";
import { useParticipants } from "../../contexts/participants";
import Avatar from "../../components/avatar";
import { useMeetings } from "../../contexts/meetings";
import { useNavigate } from "react-router-dom";

interface ITopics {
  name: string;
  duration: number;
}

interface IParticipant {
  id: string;
  imageSrc?: string;
  name: string;
  noteTaker: boolean;
  timeKeeper: boolean;
}

const NewMeeting = () => {
  const [topic, setTopic] = useState<ITopics>({
    name: "",
    duration: 1,
  });

  const navigate = useNavigate();

  const [topics, setTopics] = useState<ITopics[]>([
    {
      name: "Progress Updates",
      duration: 10,
    },
    {
      name: "Blockers",
      duration: 5,
    },
    {
      name: "Actions Items",
      duration: 5,
    },
  ]);

  const {filtered, setSearch, search} = useParticipants()
  
  const [participants, setParticipants] = useState<IParticipant[]>([
    {
      id: "scmr",
      name: "Sarah Chen",
      noteTaker: false,
      timeKeeper: false,
    },
    {
      id: "mcpr",
      name: "Michael Park",
      noteTaker: false,
      timeKeeper: false,
    },
    {
      id: "ewcf",
      name: "Emma Wilson",
      noteTaker: false,
      timeKeeper: false,
    },
    {
      id: "vcrr",
      name: "James Rodriguez",
      noteTaker: false,
      timeKeeper: false,
    },
  ]);

  const { createMeeting } = useMeetings();
  
  const handleStartMeeting = async () => {
    const meetingId = await createMeeting(participants, topics);
    if(meetingId) navigate(`/meeting?id=${meetingId}`);
  };
  return (
    <>
      <WidthContainer>
        <header className={styles.header}>
          <span className={styles.title}>Configurar reunião</span>
          <button onClick={handleStartMeeting}>Começar reunião</button>
        </header>
        <div className={styles.meetingSetUpContainer}>
          <ContainerWithTitle title="Tópicos">
            <span className={styles.topicsTotalCount}>
              Total: {topics.reduce((sum, item) => sum + item.duration, 0)} min
            </span>
            <ol className={styles.topicsContainer}>
              {topics.map((topic: ITopics, key) => {
                return (
                  <li key={key}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span className={styles.topicName}>{topic.name}</span>
                      <span className={styles.topicDuration}>
                        {topic.duration}&nbsp;min
                      </span>
                    </div>
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        marginLeft: "16px",
                      }}
                      onClick={() => {
                        const newTopics = [...topics];
                        newTopics.splice(key, 1);
                        setTopics(newTopics);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className={styles.addTopicContainer}>
              <span className={styles.addTopicTitle}>Adicionar tópico</span>
              <div className={styles.addTopicContent}>
                <input
                  value={topic.name}
                  onChange={(e) => {
                    setTopic({
                      name: e.target.value,
                      duration: topic.duration,
                    });
                  }}
                  className={styles.topicNameInput}
                  placeholder="Nome do tópico"
                  type="text"
                  name=""
                  id=""
                />
                <div className={styles.topicDurationContainer}>
                  <input
                    value={topic.duration}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      if (newValue < 1) return;
                      setTopic({
                        name: topic.name,
                        duration: newValue,
                      });
                    }}
                    className={styles.topicDurationInput}
                    type="number"
                    name=""
                    id=""
                  />
                  <span>min</span>
                </div>
                <button
                  onClick={() => {
                    if (topic.name === "") return;

                    setTopics([...topics, topic]);
                    setTopic({
                      name: "",
                      duration: 1,
                    });
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </ContainerWithTitle>
          <ContainerWithTitle title="Participantes">
            <ul className={styles.participantsContainer}>
              {participants.map((participant: IParticipant, key: number) => {
                return (
                  <li className={styles.participantItem} key={key}>
                    <div className={styles.participantInfos}>
                      <Avatar alt={participant.name} imgSrc={participant.imageSrc}/>
                      <span>{participant.name}</span>
                    </div>
                    <div className={styles.participantsAttr}>
                      <button
                        onClick={() => {
                          {
                            const newParticipants = [...participants];
                            newParticipants[key].noteTaker =
                              !newParticipants[key].noteTaker;
                            setParticipants(newParticipants);
                          }
                        }}
                        style={{
                          ...(participant.noteTaker && { color: "#fff" }),
                          ...(participant.noteTaker && {
                            backgroundColor: "#22C55E",
                          }),
                        }}
                      >
                        Anotador
                      </button>
                      <button
                        onClick={() => {
                          {
                            const newParticipants = [...participants];
                            newParticipants[key].timeKeeper =
                              !newParticipants[key].timeKeeper;
                            setParticipants(newParticipants);
                          }
                        }}
                        style={{
                          ...(participant.timeKeeper && { color: "#fff" }),
                          ...(participant.timeKeeper && {
                            backgroundColor: "#22C55E",
                          }),
                        }}
                      >
                        Cronometrista
                      </button>
                      <button
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff"
                      }}
                      onClick={() => {
                        const newParticipants = [...participants];
                        newParticipants.splice(key, 1);
                        setParticipants(newParticipants);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={styles.addParticipantContainer}>
              <span className={styles.addParticipantTitle}>
                Adicionar participante
              </span>
              <div className={styles.addParticipantContent}>
                <div className={styles.addParticipantInputContainer}>
                  <input
                    className={styles.participantNameInput}
                    placeholder="Nome do participante"
                    value={search}
                    onChange={(e)=>{setSearch(e.target.value)}}
                    type="text"
                    name=""
                    id=""
                  />
                 {
                  filtered.length > 0 && search !== "" && (
                    <ul className={styles.searchDropdown}>
                      {
                        filtered.map((participant, key) => (
                          <li onClick={()=>{
                            setParticipants([...participants, {...participant, noteTaker: false, timeKeeper: false}])
                            setSearch("")
                          }} key={key} className="dropdown-item">
                             <Avatar alt={participant.name} imgSrc={participant.imageSrc}/>
                            <span>{participant.name}</span>
                          </li>
                        ))
                      }
                    </ul>
                  )
                }

                </div>
              </div>
            </div>
          </ContainerWithTitle>
        </div>
      </WidthContainer>
    </>
  );
};

export default NewMeeting;
