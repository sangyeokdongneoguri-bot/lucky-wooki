import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const audio = new Audio('/audio/bgm.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleFirstInteraction = () => {
      if (!initialized) {
        audio.play().then(() => {
          setIsPlaying(true);
          setInitialized(true);
        }).catch(() => {
          // Autoplay blocked — user must tap button manually
        });
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      audio.pause();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setInitialized(true);
      }).catch(() => {});
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
      }}
    >
      <motion.button
        onClick={togglePlay}
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isPlaying
            ? { repeat: Infinity, duration: 8, ease: 'linear' }
            : { duration: 0.3 }
        }
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: 'rgba(212, 165, 116, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(180, 130, 80, 0.35)',
          color: '#FFFFFF',
          padding: 0,
        }}
        title={isPlaying ? '음악 끄기' : '음악 켜기'}
      >
        {isPlaying ? (
          /* Music note icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        ) : (
          /* Muted music icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
