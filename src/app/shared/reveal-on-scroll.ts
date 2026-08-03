import { afterNextRender, Directive, DestroyRef, ElementRef, inject, signal } from '@angular/core';

const REVEAL_THRESHOLD = 0.15;

@Directive({
  selector: '[appRevealOnScroll]',
  host: {
    class: 'reveal-on-scroll',
    '[class.is-revealed]': 'isRevealed()',
  },
})
export class RevealOnScroll {
  protected readonly isRevealed = signal(false);

  constructor() {
    const elementRef = inject(ElementRef<HTMLElement>);
    const destroyRef = inject(DestroyRef);

    // window/IntersectionObserver access confined to this browser-only callback,
    // same SSR-safety pattern used by NavBar's scroll listener.
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.isRevealed.set(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.isRevealed.set(true);
            observer.unobserve(elementRef.nativeElement);
          }
        },
        { threshold: REVEAL_THRESHOLD },
      );
      observer.observe(elementRef.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
