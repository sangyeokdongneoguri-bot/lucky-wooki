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
function Spacer() {
  return <div style={{ height: 20 }} />;
}

function WeddingPage() {
  return (
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
      <Rsvp />
      <Spacer />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
