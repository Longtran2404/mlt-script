
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const element = countRef.current;
    if (!element) return;

    const startCount = () => {
      startTimeRef.current = Date.now();

      const updateCount = () => {
        const now = Date.now();
        const elapsed = now - (startTimeRef.current || 0);
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * end);

        if (element) {
          element.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;
        }

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(updateCount);
        }
      };

      updateCount();
    };

    // Start animation after a small delay
    const timeoutId = setTimeout(startCount, 100);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, prefix, suffix]);

  return (
    <motion.span
      ref={countRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}
