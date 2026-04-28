import { useIsMobile } from "./use-mobile";

export function useMobileLayout() {
  const isMobile = useIsMobile();
  return {
    isMobile,
    sp:      isMobile ? "64px 20px" : "112px 24px",
    spCta:   isMobile ? "60px 20px" : "100px 24px",
    spFt:    isMobile ? "40px 20px 24px" : "64px 24px 32px",
    spStrip: isMobile ? "28px 16px" : "36px 24px",
    heroPy:  isMobile ? 56 : 96,
  };
}
