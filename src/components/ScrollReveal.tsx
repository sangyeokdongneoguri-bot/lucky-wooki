import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

const getInitial = (direction: ScrollRevealProps['direction']) => {
  switch (direction) {
    case 'up':    return { opacity: 0, y: 40 };
    case 'down':  return { opacity: 0, y: -40 };
    case 'left':  return { opacity: 0, x: 40 };
    case 'right': return { opacity: 0, x: -40 };
    case 'none':  return { opacity: 0 };
    default:      return { opacity: 0, y: 40 };
  }
};

const getAnimate = (direction: ScrollRevealProps['direction']) => {
  switch (direction) {
    case 'left':
    case 'right': return { opacity: 1, x: 0 };
    case 'none':  return { opacity: 1 };
    default:      return { opacity: 1, y: 0 };
  }
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial(direction)}
      animate={isInView ? getAnimate(direction) : getInitial(direction)}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
