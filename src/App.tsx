import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageSection from './components/PageSection';
import AttendancePopup, { isDismissedToday } from './components/AttendancePopup';
import Page2PhotoMessage from './pages/Page2PhotoMessage';
import Page3FamilyLetter from './pages/Page3FamilyLetter';
import Page4Gallery from './pages/Page4Gallery';
import Page5WeddingInfo from './pages/Page5WeddingInfo';
import Page1Opening from './pages/Page1Opening';
import Page6Account from './pages/Page6Account';
import Page7Countdown from './pages/Page7Countdown';

function WeddingPage() {
  const [showPopup, setShowPopup] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isDismissedToday()) {
          setShowPopup(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '-100px 0px 0px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <PageSection page={1}>
        <Page1Opening />
      </PageSection>
      <PageSection page={2}>
        <div ref={sentinelRef} style={{ height: 1 }} />
        <Page2PhotoMessage />
        <Page7Countdown />
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
