import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Greeting from './components/Greeting';
import Calendar from './components/Calendar';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Account from './components/Account';
import Rsvp from './components/Rsvp';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import BgmPlayer from './components/BgmPlayer';
import PartyPage from './pages/PartyPage';

const COLORS = {
  accent: '#D4A574',
  border: '#E8D5C4',
};

function Divider() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px 40px',
    }}>
      <div style={{ flex: 1, height: '1px', backgroundColor: COLORS.border }} />
      <div style={{ margin: '0 16px', color: COLORS.accent, lineHeight: 1 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 22C12 22 4 16 4 9C4 5.13 7.13 2 11 2C11.34 2 11.67 2.03 12 2.08C12.33 2.03 12.66 2 13 2C16.87 2 20 5.13 20 9C20 16 12 22 12 22Z"
            fill={COLORS.accent}
            opacity="0.5"
          />
          <path
            d="M12 22V8"
            stroke={COLORS.accent}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 13C12 13 9 11 8 8"
            stroke={COLORS.accent}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M12 16C12 16 15 14 16 11"
            stroke={COLORS.accent}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div style={{ flex: 1, height: '1px', backgroundColor: COLORS.border }} />
    </div>
  );
}

function WeddingPage() {
  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', overflowX: 'hidden' }}>
      <Hero />
      <Divider />
      <Greeting />
      <Divider />
      <Calendar />
      <Divider />
      <Gallery />
      <Divider />
      <Location />
      <Divider />
      <Account />
      <Divider />
      <Rsvp />
      <Divider />
      <Guestbook />
      <Footer />
      <BgmPlayer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeddingPage />} />
        <Route path="/party" element={<PartyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
