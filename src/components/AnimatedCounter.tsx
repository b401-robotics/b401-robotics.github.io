import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
}

export function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  const stringValue = String(value);
  const numericPart = parseInt(stringValue.replace(/[^0-9]/g, "")) || 0;
  const suffix = stringValue.replace(/[0-9]/g, "");

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // easeOutQuart easing
            const easeOut = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(easeOut * numericPart));
            
            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCount(numericPart);
            }
          };
          animationFrameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [numericPart, duration]);

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
}
