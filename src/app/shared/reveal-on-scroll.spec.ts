import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevealOnScroll } from './reveal-on-scroll';

@Component({
  selector: 'app-reveal-host',
  imports: [RevealOnScroll],
  template: `<div appRevealOnScroll></div>`,
})
class RevealHost {}

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  readonly root = null;
  readonly rootMargin = '';
  readonly scrollMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  readonly observe = vi.fn();
  readonly unobserve = vi.fn();
  readonly disconnect = vi.fn();

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting: boolean): void {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this);
  }
}

describe('RevealOnScroll', () => {
  let fixture: ComponentFixture<RevealHost>;

  beforeEach(async () => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
    vi.stubGlobal(
      'matchMedia',
      (query: string) =>
        ({
          matches: false,
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    );

    await TestBed.configureTestingModule({
      imports: [RevealHost],
    }).compileComponents();

    fixture = TestBed.createComponent(RevealHost);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should not be revealed initially', async () => {
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('div').classList.contains('is-revealed')).toBe(false);
  });

  it('should reveal and unobserve once intersecting past the threshold', async () => {
    await fixture.whenStable();
    const observer = MockIntersectionObserver.instances[0];
    observer.trigger(true);
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector('div');
    expect(div.classList.contains('is-revealed')).toBe(true);
    expect(observer.unobserve).toHaveBeenCalled();
  });

  it('should reveal immediately, without observing, under prefers-reduced-motion', async () => {
    vi.stubGlobal(
      'matchMedia',
      (query: string) =>
        ({
          matches: true,
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    );

    fixture = TestBed.createComponent(RevealHost);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('div').classList.contains('is-revealed')).toBe(true);
    expect(MockIntersectionObserver.instances.length).toBe(0);
  });
});
