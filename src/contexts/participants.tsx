import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import debounce from 'lodash.debounce';

// Interface definition
export interface IParticipant {
  id: string;
  imageSrc?: string;
  name: string;
}

// Mock data
const mockParticipants: IParticipant[] = [
  { id: 'alcm',name: 'Alice' },
  { id: 'bbsc',  name: 'Bob'  },
  { id: 'cass', name: 'Carol' },
  { id: 'dave',  name: 'Dave' },
  { id: 'evel',  name: 'Eve' },
  { id: 'pjfm',  name: 'Peterson Melo' },
  { id: 'vcms', name: 'Victor Matias' },
  { id: 'mxs2', name: 'Matheus Xavier' }
];

// Context types
interface ParticipantsContextValue {
  participants: IParticipant[];
  filtered: IParticipant[];
  search: string;
  setSearch: (term: string) => void;
}

// Create context
const ParticipantsContext = createContext<ParticipantsContextValue | undefined>(undefined);

// Provider component
export const ParticipantsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [participants] = useState<IParticipant[]>(mockParticipants);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  // Debounce update of search term
  const debouncedUpdate = useMemo(
    () => debounce((term: string) => setDebouncedSearch(term), 500),
    []
  );

  useEffect(() => {
    debouncedUpdate(search);
    // Cleanup on unmount or change
    return () => { debouncedUpdate.cancel(); };
  }, [search, debouncedUpdate]);

  // Filter participants by id or name
  const filtered = useMemo(() => {
    if (!debouncedSearch) return participants;
    const term = debouncedSearch.toLowerCase();
    return participants.filter(p =>
      p.id === debouncedSearch || p.name.toLowerCase().includes(term)
    );
  }, [participants, debouncedSearch]);

  return (
    <ParticipantsContext.Provider value={{ participants, filtered, search, setSearch }}>
      {children}
    </ParticipantsContext.Provider>
  );
};

// Custom hook
export const useParticipants = (): ParticipantsContextValue => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw new Error('useParticipants must be used within a ParticipantsProvider');
  }
  return context;
};
