import { useEffect, useRef } from "react";

interface Props {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}

export default function WordReveal({ text, style, className, delay = 0 }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>(".wr-word");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        words.forEach((word, i) => {
          word.style.animationDelay = `${delay + i * 0.08}s`;
          word.classList.add("wr-visible");
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={containerRef} className={className} style={{ ...style, display: "inline" }}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="wr-word"
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
