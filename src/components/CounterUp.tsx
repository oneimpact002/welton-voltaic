import { useEffect, useRef, CSSProperties } from "react";

interface Props {
  to: number;
  prefix?: string;
  suffix?: string;
  style?: CSSProperties;
  className?: string;
}

export default function CounterUp({ to, prefix = "", suffix = "", style, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const duration = 1500;
        const start = performance.now();

        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = prefix + Math.floor(eased * to) + suffix;
          if (t < 1) requestAnimationFrame(step);
          else el.textContent = prefix + to + suffix;
        };

        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );

    el.textContent = prefix + "0" + suffix;
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, prefix, suffix]);

  return (
    <span ref={ref} style={style} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
