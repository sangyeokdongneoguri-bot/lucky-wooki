import { useState, useEffect } from 'react';
import { weddingData } from '../data/wedding';
import ScrollReveal from '../components/ScrollReveal';

const weddingDate = weddingData.dDay;

const dateLabel = `${weddingDate.getFullYear()}. ${String(weddingDate.getMonth() + 1).padStart(2, '0')}. ${String(weddingDate.getDate()).padStart(2, '0')} · 2:00 PM`;

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

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = getTimeLeft();
        if (next.seconds === prev.seconds) return prev;
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HOURS' },
    { value: timeLeft.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, label: 'SECONDS' },
  ];

  const infoStyle: React.CSSProperties = {
    fontSize: '17px',
    fontWeight: 400,
    color: '#555',
    letterSpacing: '0.08em',
    margin: 0,
  };

  return (
    <ScrollReveal>
    <div style={{
      width: '100%',
      padding: '48px 24px',
      boxSizing: 'border-box',
      textAlign: 'center',
    }}>
      <p style={{ ...infoStyle, fontSize: '25px', marginBottom: '4px' }}>{dateLabel}</p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '20px',
      }}>
        {units.map(({ value, label }) => (
          <div key={label} style={{ minWidth: '48px' }}>
            <p style={{
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
