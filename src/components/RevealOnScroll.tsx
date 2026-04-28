import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function RevealOnScroll({ children, delay = 0, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
