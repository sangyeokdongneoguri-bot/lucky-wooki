import { useRef, useState, useEffect, useCallback } from 'react';

export default function BgMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  // Auto-play on first user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const start = () => {
      audio.play().then(() => {
        setPlaying(true);
        window.removeEventListener('click', start);
        window.removeEventListener('touchstart', start);
        window.removeEventListener('scroll', start);
      }).catch(() => {});
    };

    window.addEventListener('click', start, { once: true });
    window.addEventListener('touchstart', start, { once: true });
    window.addEventListener('scroll', start, { once: true });

    return () => {
      window.removeEventListener('click', start);
      window.removeEventListener('touchstart', start);
      window.removeEventListener('scroll', start);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/audio/bgm.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 1000,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(0,0,0,0.15)',
          background: 'rgba(255,255,255,0.85)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          color: '#555',
          backdropFilter: 'blur(4px)',
        }}
        aria-label={playing ? '음악 끄기' : '음악 켜기'}
      >
        {playing ? '♫' : '♫'}
        {!playing && (
          <div style={{
            position: 'absolute',
            width: '20px',
            height: '1.5px',
            background: 'linear-gradient(#555, #555)',
            transform: 'rotate(-45deg)',
          }} />
        )}
      </button>
    </>
  );
}
