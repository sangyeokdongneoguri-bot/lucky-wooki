import { useState, useEffect, type CSSProperties } from 'react';

type FrameStyle = 'polaroid' | 'border' | 'none';
type Transition = 'fade' | 'slide' | 'none';

interface MediaFrameProps {
  /** Single image, multiple images, or video URL */
  sources: string[];
  /** 'image' or 'video' */
  type?: 'image' | 'video';
  /** Frame visual style */
  frameStyle?: FrameStyle;
  /** Transition effect for multiple images */
  transition?: Transition;
  /** Interval in ms for auto-rotation (default 3000) */
  interval?: number;
  /** Aspect ratio (default '3 / 4') */
  aspectRatio?: string;
  /** Width (default '100%') */
  width?: string | number;
  /** Rotation angle in degrees */
  rotation?: number;
  /** Additional container styles */
  style?: CSSProperties;
}

const frameStyles: Record<FrameStyle, CSSProperties> = {
  polaroid: {
    background: '#fff',
    padding: '10px 10px 40px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  },
  border: {
    border: '1px solid #ddd',
  },
  none: {},
};

export default function MediaFrame({
  sources,
  type = 'image',
  frameStyle = 'none',
  transition = 'fade',
  interval = 3000,
  aspectRatio = '3 / 4',
  width = '100%',
  rotation = 0,
  style,
}: MediaFrameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const multipleImages = type === 'image' && sources.length > 1;

  useEffect(() => {
    if (!multipleImages) return;

    const timer = setInterval(() => {
      if (transition === 'none') {
        setCurrentIndex((prev) => (prev + 1) % sources.length);
      } else {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % sources.length);
          setIsTransitioning(false);
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [multipleImages, sources.length, interval, transition]);

  const transitionStyles: CSSProperties =
    transition === 'fade'
      ? { opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.4s ease' }
      : transition === 'slide'
        ? {
            transform: `translateX(${isTransitioning ? '-100%' : '0'})`,
            transition: 'transform 0.4s ease',
          }
        : {};

  return (
    <div
      style={{
        display: 'inline-block',
        width,
        overflow: 'hidden',
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        ...frameStyles[frameStyle],
        ...style,
      }}
    >
      {type === 'video' ? (
        <video
          src={sources[0]}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', display: 'block', aspectRatio, objectFit: 'cover' }}
        />
      ) : (
        <img
          src={sources[currentIndex]}
          alt=""
          style={{
            width: '100%',
            display: 'block',
            aspectRatio,
            objectFit: 'cover',
            ...transitionStyles,
          }}
        />
      )}
    </div>
  );
}
