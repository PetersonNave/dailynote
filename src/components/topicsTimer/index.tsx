import React, { useEffect, useRef, useState } from "react";
import WidthContainer from "../WidthContainer";
import styles from "./topicsTimer.module.scss";
import type { ITopics } from "../../contexts/meetings";

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return min <= 0 && sec <= 0 ? "FIM DO TÓPICO!" : `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

const TopicsTimer = ({ topics }: { topics: ITopics[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTimes, setRemainingTimes] = useState<number[]>(
    topics.map(topic => topic.duration * 60)
  );
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const currentName = topics[currentIndex]?.name || "";

  // Timer effect
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
        backgroundColor: "#FFF",
        borderBottom: "1px solid #E2E8F0",
        boxShadow: "0px 1px 8px rgba(0,0,0,0.05)",
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
          <div className={styles.timerContainer}>
            <span>{formatTime(remainingTimes[currentIndex])}</span>
            <button style={{
                ...isRunning && {backgroundColor: "#dc3545"}
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
        </div>
      </div>
    </WidthContainer>
  );
};

export default TopicsTimer;
