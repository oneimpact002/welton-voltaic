import { getLenis } from "./lenis";

export function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  getLenis().scrollTo(el, { offset: 0 });
}
