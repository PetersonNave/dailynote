import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import NewMeeting from './pages/new-meeting';
import MeetingPage from './pages/meetingPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nova-reuniao" element={<NewMeeting />} />
      <Route path="/meeting" element={<MeetingPage />} />
    </Routes>
  );
}
