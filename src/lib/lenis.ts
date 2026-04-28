import Lenis from "lenis";

let instance: Lenis | null = null;

export function getLenis(): Lenis {
  if (!instance) {
    instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
  }
  return instance;
}

export function destroyLenis() {
  instance?.destroy();
  instance = null;
}
