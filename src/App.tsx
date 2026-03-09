import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EntryPopup from './components/EntryPopup';
import Hero from './components/Hero';
import Greeting from './components/Greeting';
import Calendar from './components/Calendar';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Account from './components/Account';
import Guestbook from './components/Guestbook';
import InfoNotice from './components/InfoNotice';
import Footer from './components/Footer';
import BgmPlayer from './components/BgmPlayer';

function Spacer() {
  return <div style={{ height: 20 }} />;
}

function WeddingPage() {
  const [entered, setEntered] = useState(false);

  const handleEnter = useCallback(() => {
    setEntered(true);
  }, []);

  return (
    <>
      {!entered && <EntryPopup onEnter={handleEnter} />}
      {entered && (
        <div style={{ maxWidth: '480px', margin: '0 auto', overflowX: 'hidden' }}>
          <Hero />
          <Spacer />
          <Greeting />
          <Spacer />
          <Calendar />
          <Spacer />
          <Gallery />
          <Spacer />
          <Location />
          <Spacer />
          <Account />
          <Spacer />
          <Guestbook />
          <Spacer />
          <InfoNotice />
          <Footer />
          <BgmPlayer />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeddingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
