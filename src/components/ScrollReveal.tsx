import type { ReactNode, CSSProperties } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
}

export default function ScrollReveal({ children, style, delay = 0 }: ScrollRevealProps) {
  const { ref, style: revealStyle } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      style={{
        ...revealStyle,
        transitionDelay: delay ? `${delay}s` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
