import type { CSSProperties } from 'react';

interface PolaroidProps {
  src: string;
  alt?: string;
  rotation?: number;
  width?: string | number;
  style?: CSSProperties;
}

export default function Polaroid({ src, alt = '', rotation = 0, width = '240px', style }: PolaroidProps) {
  return (
    <div
      style={{
        display: 'inline-block',
        background: '#fff',
        padding: '10px 10px 40px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        width,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          display: 'block',
          aspectRatio: '3 / 4',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
