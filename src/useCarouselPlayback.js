import { useEffect, useRef, useState } from "react";

export const SLIDE_DURATION = 8000;

export default function useCarouselPlayback({
  containerRef,
  cycle,
  onAdvance,
  reading,
}) {
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const elapsed = useRef(0);
  const advance = useRef(onAdvance);

  useEffect(() => {
    advance.current = onAdvance;
  }, [onAdvance]);
  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(Boolean(media?.matches));
      setMotionAllowed(false);
    };
    update();
    media?.addEventListener("change", update);
    return () => media?.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!window.IntersectionObserver) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25);
      },
      { threshold: [0, 0.25] },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  const stopped = userPaused || (reducedMotion && !motionAllowed);
  const playing =
    !stopped &&
    !hovered &&
    !focused &&
    !touching &&
    !reading &&
    inView &&
    !hidden;

  // Preserve the remaining time on temporary pauses; a new slide gets eight seconds.
  useEffect(() => {
    elapsed.current = 0;
  }, [cycle]);
  useEffect(() => {
    if (!playing) return undefined;
    const started = performance.now();
    const timer = window.setTimeout(
      () => advance.current(),
      Math.max(0, SLIDE_DURATION - elapsed.current),
    );
    return () => {
      window.clearTimeout(timer);
      elapsed.current += performance.now() - started;
    };
  }, [cycle, playing]);

  function toggle() {
    if (!stopped) {
      setUserPaused(true);
    } else {
      setUserPaused(false);
      setMotionAllowed(true);
      // An explicit play action resumes even while its control still has focus.
      setFocused(false);
      setHovered(false);
    }
  }

  return { playing, stopped, toggle, setHovered, setFocused, setTouching };
}
