import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageSection from './components/PageSection';
import AttendancePopup, { isDismissedToday } from './components/AttendancePopup';
import Page2PhotoMessage from './pages/Page2PhotoMessage';
import Page3FamilyLetter from './pages/Page3FamilyLetter';
import Page4Gallery from './pages/Page4Gallery';
import Page5WeddingInfo from './pages/Page5WeddingInfo';
import Page1Opening from './pages/Page1Opening';
import Page6Account from './pages/Page6Account';
import CountdownSection from './pages/CountdownSection';
import BgMusic from './components/BgMusic';

function WeddingPage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isDismissedToday()) return;

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.1) {
        setShowPopup(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      <PageSection page={1}>
        <Page1Opening />
      </PageSection>
      <PageSection page={2}>
        <CountdownSection />
        <Page2PhotoMessage />
      </PageSection>
      <PageSection page={3}>
        <Page3FamilyLetter />
      </PageSection>
      <PageSection page={4}>
        <Page4Gallery />
      </PageSection>
      <PageSection page={5}>
        <Page5WeddingInfo />
      </PageSection>
      <PageSection page={6}>
        <Page6Account />
      </PageSection>
      <BgMusic />
      {showPopup && <AttendancePopup onClose={() => setShowPopup(false)} />}
    </div>
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
