import type { ReactNode, CSSProperties } from 'react';
import { useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
}

export default function ScrollReveal({ children, style, delay = 0 }: ScrollRevealProps) {
  const { ref } = useScrollReveal(0.15);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node && delay) {
        node.style.transitionDelay = `${delay}s`;
      }
      ref(node);
    },
    [ref, delay],
  );

  return (
    <div ref={setRef} style={style}>
      {children}
    </div>
  );
}
