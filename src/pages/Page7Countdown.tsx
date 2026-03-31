import { useState, useEffect } from 'react';
import { weddingData } from '../data/wedding';
import ScrollReveal from '../components/ScrollReveal';

const weddingDate = new Date(weddingData.date);

function getTimeLeft() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export default function Page7Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const month = months[weddingDate.getMonth()];
  const day = weddingDate.getDate();
  const year = weddingDate.getFullYear();

  const units = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, label: 'SECONDS' },
  ];

  return (
    <ScrollReveal>
    <div style={{
      width: '100%',
      padding: '48px 24px',
      boxSizing: 'border-box',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '14px',
        fontWeight: 300,
        color: '#888',
        margin: '0 0 12px',
        letterSpacing: '0.08em',
      }}>
        so please join us...
      </p>

      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '32px',
        fontWeight: 400,
        color: '#222',
        margin: '0 0 4px',
        letterSpacing: '0.05em',
        textTransform: 'lowercase',
      }}>
        {month} {day}, {year}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '20px',
      }}>
        {units.map(({ value, label }) => (
          <div key={label} style={{ minWidth: '48px' }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '24px',
              fontWeight: 400,
              color: '#333',
              margin: '0 0 2px',
            }}>
              {value}
            </p>
            <p style={{
              fontSize: '9px',
              color: '#999',
              margin: 0,
              letterSpacing: '0.1em',
            }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
    </ScrollReveal>
  );
}
