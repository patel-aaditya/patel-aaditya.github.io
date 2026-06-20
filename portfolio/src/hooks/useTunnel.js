import { useEffect, useRef } from "react";

export function useScrollY() {
  const ref = useRef(0);
  useEffect(() => {
    const handler = () => { ref.current = window.scrollY; };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return ref;
}
