import { useRef, useCallback } from 'react';

export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      if (!node) return;

      // Initial hidden state
      node.style.opacity = '0';
      node.style.transform = 'translateY(30px)';
      node.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      node.style.willChange = 'opacity, transform';

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
            // Clean up will-change after animation
            node.addEventListener('transitionend', () => {
              node.style.willChange = 'auto';
            }, { once: true });
            observer.disconnect();
          }
        },
        { threshold },
      );
      observer.observe(node);
    },
    [threshold],
  );

  return { ref: setRef };
}
