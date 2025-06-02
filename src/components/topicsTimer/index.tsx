import React, { useEffect, useRef, useState } from "react";
import WidthContainer from "../WidthContainer";
import styles from "./topicsTimer.module.scss";
import type { ITopics } from "../../contexts/meetings";

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return min <= 0 && sec <= 0 ? "FIM DO TÓPICO!" : `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

const TopicsTimer = ({ topics, handleFinish }: { topics: ITopics[], handleFinish: (timeStamp:number) => void }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTimes, setRemainingTimes] = useState<number[]>(
      topics.map(topic => topic.duration * 60)
    );
const [initialDuration, setInitialDuration] = useState<number>(topics.map(topic => topic.duration * 60).reduce((a, b) => a + b, 0));
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const currentName = topics[currentIndex]?.name || "";


  const calculateTimeStamp  :()=>number=() =>{
      
      const totalDuration = remainingTimes.reduce((sum, t) => sum + t, 0);
      console.log(initialDuration, totalDuration);
    return Math.floor((initialDuration - totalDuration)/60)
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingTimes(prev => {
          const updated = [...prev];
          if (updated[currentIndex] > 0) {
            updated[currentIndex] -= 1;
          } else {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
          }
          return updated;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, currentIndex]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleNext = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setCurrentIndex((prev) => Math.min(prev + 1, topics.length - 1));
  };

  const handlePrev = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current!);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <WidthContainer
      stylesInline={{
        background: "#FFF",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "0px 1px 8px rgba(0,0,0,0.05)",
        position: 'fixed',
        top: "0px",
        left: "0px",
        zIndex: "999"
      }}
    >
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>{currentName}</h1>
          <span>
            Tópico {currentIndex + 1} de {topics.length}
          </span>
        </div>
        <div className={styles.rightSide}>
          <div  style={{
                ...isRunning && {backgroundColor: "#3B82F6"}
            }} className={styles.timerContainer}>
            <span  style={{
                ...isRunning && {color: "#FFF"}
            }}>{formatTime(remainingTimes[currentIndex])}</span>
            <button style={{
                ...isRunning && {backgroundColor: "#dc3545"},
            }} onClick={handleToggle} >
              {isRunning ? "Parar" : "Começar"}
            </button>
          </div>
          <div className={styles.topicControllerContainer}>
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === topics.length - 1}
            >
              Próximo
            </button>
          </div>
           <div  className={styles.finishDaily}>
                      <button onClick={()=> handleFinish(calculateTimeStamp())}>Encerrar</button>
            </div>
        </div>
      </div>
    </WidthContainer>
  );
};

export default TopicsTimer;
