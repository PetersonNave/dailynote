import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { ParticipantsProvider } from './contexts/participants.tsx';
import { MeetingsProvider } from './contexts/meetings.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <MeetingsProvider>
        <ParticipantsProvider>
          <App />
        </ParticipantsProvider>
      </MeetingsProvider>
    </StrictMode>  
  </BrowserRouter>
)
