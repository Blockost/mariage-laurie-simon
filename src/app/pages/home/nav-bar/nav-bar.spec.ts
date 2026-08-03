import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOME_CONTENT } from '../../../content/home-content';
import { NavBar } from './nav-bar';

const STUBBED_VIEWPORT_HEIGHT = 800;

// jsdom doesn't implement window.scrollTo (it's a documented no-op), so tests set
// window.scrollY directly and dispatch a scroll event to simulate the browser.
function simulateScrollTo(y: number): void {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
  window.dispatchEvent(new Event('scroll'));
}

function stubViewportHeight(height: number): void {
  Object.defineProperty(window, 'innerHeight', { value: height, configurable: true });
}

describe('NavBar', () => {
  let component: NavBar;
  let fixture: ComponentFixture<NavBar>;
  let navElement: HTMLElement;

  beforeEach(async () => {
    stubViewportHeight(STUBBED_VIEWPORT_HEIGHT);

    await TestBed.configureTestingModule({
      imports: [NavBar],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBar);
    component = fixture.componentInstance;
    await fixture.whenStable();

    navElement = fixture.nativeElement.querySelector('.nav-bar');
  });

  afterEach(() => {
    simulateScrollTo(0);
    document.body.style.overflow = '';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose one nav item per home section, labeled from HOME_CONTENT, plus a leading home item', () => {
    const labels = component['navItems'].map((item) => item.label);
    expect(labels).toEqual([
      'Home',
      HOME_CONTENT.location.title,
      HOME_CONTENT.eventDetails.title,
      HOME_CONTENT.dressCode.title,
      HOME_CONTENT.gift.title,
    ]);
  });

  it('should render the couple initials in the mobile bar', () => {
    const initials = fixture.nativeElement.querySelector('.mobile-initials') as HTMLElement;
    expect(initials.textContent?.trim()).toBe(HOME_CONTENT.couple.initials);
  });

  it('should not show an opaque background before scrolling past 60% of the viewport height', () => {
    simulateScrollTo(STUBBED_VIEWPORT_HEIGHT * 0.6);
    fixture.detectChanges();

    expect(component['isScrolled']()).toBe(false);
    expect(navElement.classList.contains('is-scrolled')).toBe(false);
  });

  it('should show an opaque background once scrolled past 60% of the viewport height', () => {
    simulateScrollTo(STUBBED_VIEWPORT_HEIGHT * 0.6 + 1);
    fixture.detectChanges();

    expect(component['isScrolled']()).toBe(true);
    expect(navElement.classList.contains('is-scrolled')).toBe(true);
  });

  it('should drop the opaque background once scrolled back above the threshold', () => {
    simulateScrollTo(STUBBED_VIEWPORT_HEIGHT * 0.6 + 1);
    fixture.detectChanges();

    simulateScrollTo(0);
    fixture.detectChanges();

    expect(component['isScrolled']()).toBe(false);
  });

  describe('mobile drawer', () => {
    function menuToggle(): HTMLButtonElement {
      return fixture.nativeElement.querySelector('.menu-toggle');
    }

    function drawer(): HTMLElement | null {
      return fixture.nativeElement.querySelector('.mobile-drawer');
    }

    it('should be closed by default', () => {
      expect(component['isDrawerOpen']()).toBe(false);
      expect(drawer()).toBeNull();
      expect(menuToggle().getAttribute('aria-expanded')).toBe('false');
    });

    it('should open when the menu toggle is clicked, and lock body scroll', () => {
      menuToggle().click();
      fixture.detectChanges();

      expect(component['isDrawerOpen']()).toBe(true);
      expect(drawer()).not.toBeNull();
      expect(drawer()?.querySelector('.drawer-blob')).not.toBeNull();
      expect(menuToggle().getAttribute('aria-expanded')).toBe('true');
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should close when the drawer close button is clicked, and restore body scroll', () => {
      menuToggle().click();
      fixture.detectChanges();

      const closeButton = fixture.nativeElement.querySelector('.drawer-close') as HTMLButtonElement;
      closeButton.click();
      fixture.detectChanges();

      expect(component['isDrawerOpen']()).toBe(false);
      expect(drawer()).toBeNull();
      expect(document.body.style.overflow).toBe('');
    });

    it('should close when a nav link inside the drawer is activated', () => {
      menuToggle().click();
      fixture.detectChanges();

      const link = fixture.nativeElement.querySelector(
        '.mobile-drawer-links a.nav-link',
      ) as HTMLAnchorElement;
      link.click();
      fixture.detectChanges();

      expect(component['isDrawerOpen']()).toBe(false);
      expect(drawer()).toBeNull();
    });

    it('should close when the Escape key is pressed', () => {
      menuToggle().click();
      fixture.detectChanges();

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(component['isDrawerOpen']()).toBe(false);
      expect(drawer()).toBeNull();
    });
  });
});
