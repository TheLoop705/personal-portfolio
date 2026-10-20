import { act, renderHook } from "@testing-library/react";
import useCarouselPlayback from "./useCarouselPlayback";

describe("carousel playback", () => {
  let visibility;
  let mediaChanged;
  let reduced;
  const containerRef = { current: document.createElement("div") };
  const originalObserver = window.IntersectionObserver;
  const originalMedia = window.matchMedia;
  const originalHidden = Object.getOwnPropertyDescriptor(document, "hidden");

  beforeEach(() => {
    jest.useFakeTimers();
    reduced = false;
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    window.matchMedia = () => ({
      get matches() {
        return reduced;
      },
      addEventListener: (_, callback) => {
        mediaChanged = callback;
      },
      removeEventListener: jest.fn(),
    });
    window.IntersectionObserver = class {
      constructor(callback) {
        visibility = callback;
      }
      observe() {}
      disconnect() {}
    };
  });

  afterEach(() => {
    jest.useRealTimers();
    window.IntersectionObserver = originalObserver;
    window.matchMedia = originalMedia;
    if (originalHidden)
      Object.defineProperty(document, "hidden", originalHidden);
    else delete document.hidden;
  });

  function setup() {
    const onAdvance = jest.fn();
    const hook = renderHook(
      ({ cycle = 0, reading = false }) =>
        useCarouselPlayback({ containerRef, cycle, reading, onAdvance }),
      { initialProps: {} },
    );
    return { ...hook, onAdvance };
  }

  const enter = () =>
    act(() => visibility([{ isIntersecting: true, intersectionRatio: 1 }]));
  const tick = (ms) => act(() => jest.advanceTimersByTime(ms));

  test("starts only in view and preserves the remaining eight-second interval during hover", () => {
    const { result, onAdvance } = setup();
    tick(20000);
    expect(onAdvance).not.toHaveBeenCalled();
    enter();
    tick(3000);
    act(() => result.current.setHovered(true));
    tick(20000);
    expect(onAdvance).not.toHaveBeenCalled();
    act(() => result.current.setHovered(false));
    tick(4999);
    expect(onAdvance).not.toHaveBeenCalled();
    tick(1);
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });

  test("gives a manually selected slide a fresh interval and holds open details", () => {
    const { result, rerender, onAdvance } = setup();
    enter();
    tick(7000);
    rerender({ cycle: 1 });
    tick(2000);
    expect(onAdvance).not.toHaveBeenCalled();
    rerender({ cycle: 1, reading: true });
    tick(20000);
    expect(result.current.playing).toBe(false);
    rerender({ cycle: 1, reading: false });
    tick(6000);
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });

  test("pauses on keyboard focus, out of view and in a hidden browser tab", () => {
    const { result, onAdvance } = setup();
    enter();
    act(() => result.current.setFocused(true));
    tick(10000);
    expect(onAdvance).not.toHaveBeenCalled();
    act(() => result.current.setFocused(false));
    act(() => visibility([{ isIntersecting: false, intersectionRatio: 0 }]));
    tick(10000);
    expect(onAdvance).not.toHaveBeenCalled();
    enter();
    act(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    tick(10000);
    expect(onAdvance).not.toHaveBeenCalled();
  });

  test("honors reduced motion and keeps an explicit pause across slide changes", () => {
    const { result, rerender, onAdvance } = setup();
    enter();
    act(() => {
      reduced = true;
      mediaChanged();
    });
    tick(10000);
    expect(onAdvance).not.toHaveBeenCalled();
    expect(result.current.stopped).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.playing).toBe(true);
    tick(3000);
    act(() => result.current.toggle());
    rerender({ cycle: 1 });
    tick(10000);
    expect(onAdvance).not.toHaveBeenCalled();
    act(() => result.current.toggle());
    tick(8000);
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });
});
