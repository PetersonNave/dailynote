import React, { createContext, useContext, useState, useEffect } from "react";

export interface ITopics {
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

export interface IMeeting {
  id: string;
  topics: ITopics[];
  participants: IParticipant[];
}

interface MeetingsContextProps {
  meetings: IMeeting[];
  createMeeting: (participants: IParticipant[], topics: ITopics[]) => Promise<string>;
  getMeetingById: (id: string) => Promise<IMeeting | undefined>;
}

const MeetingsContext = createContext<MeetingsContextProps | undefined>(undefined);

export const MeetingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/meetings")
      .then(res => res.json())
      .then((data: IMeeting[]) => {
        setMeetings(data);
      })
      .catch(console.error);
  }, []);

  const createMeeting = async (
    participants: IParticipant[],
    topics: ITopics[]
  ): Promise<string> => {
    const response = await fetch("http://localhost:4000/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ participants, topics })
    });

    const newMeeting: IMeeting = await response.json();
    setMeetings(prev => [...prev, newMeeting]);
    return newMeeting.id;
  };

  const getMeetingById = async (id: string): Promise<IMeeting | undefined> => {
    const res = await fetch(`http://localhost:4000/meetings/${id}`);
    if (!res.ok) return undefined;
    return await res.json();
  };

  return (
    <MeetingsContext.Provider value={{ meetings, createMeeting, getMeetingById }}>
      {children}
    </MeetingsContext.Provider>
  );
};

export const useMeetings = () => {
  const context = useContext(MeetingsContext);
  if (!context) throw new Error("useMeetings deve ser usado dentro de MeetingsProvider");
  return context;
};
