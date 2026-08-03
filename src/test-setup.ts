// Global test-environment polyfills for browser APIs jsdom doesn't implement,
// needed by RevealOnScroll (and anything else that queries media or observes
// intersection). Individual specs may still override these globals (e.g. via
// vi.stubGlobal) to assert on specific interaction behavior.

if (!('matchMedia' in window)) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList,
  });
}

if (!('IntersectionObserver' in window)) {
  class NoopIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly scrollMargin = '';
    readonly thresholds: ReadonlyArray<number> = [];

    observe(): void {}

    unobserve(): void {}

    disconnect(): void {}

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = NoopIntersectionObserver;
  (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
    NoopIntersectionObserver;
}
