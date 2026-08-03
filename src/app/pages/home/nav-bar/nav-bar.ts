import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { HOME_CONTENT } from '../../../content/home-content';
import { NavItem, NavLinks } from './nav-links/nav-links';

@Component({
  selector: 'app-nav-bar',
  imports: [NavLinks],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  protected readonly isScrolled = signal(false);
  protected readonly isDrawerOpen = signal(false);
  protected readonly initials = HOME_CONTENT.couple.initials;

  protected readonly navItems: readonly NavItem[] = [
    { label: 'Home', fragment: 'home' },
    { label: HOME_CONTENT.location.title, fragment: 'location' },
    { label: HOME_CONTENT.eventDetails.title, fragment: 'event-details' },
    { label: HOME_CONTENT.dressCode.title, fragment: 'dress-code' },
    { label: HOME_CONTENT.gift.title, fragment: 'gift' },
  ];

  // The nav is a fixed-position overlay atop the full-bleed hero, so there's no
  // "nav's own height" to measure anymore. Instead it fades in an opaque
  // background once scrolled past roughly the hero's height (60% of viewport
  // height), matching the design spec.
  private readonly onScroll = () => {
    this.isScrolled.set(window.scrollY > window.innerHeight * 0.6);
  };

  private readonly onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeDrawer();
    }
  };

  constructor() {
    const destroyRef = inject(DestroyRef);

    // window/document access is confined to this browser-only callback (and the
    // cleanup registered inside it) so none of it runs during SSR/prerendering.
    afterNextRender(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();

      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('keydown', this.onKeydown);
        document.body.style.overflow = '';
      });
    });
  }

  protected openDrawer(): void {
    this.isDrawerOpen.set(true);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.onKeydown);
  }

  protected closeDrawer(): void {
    this.isDrawerOpen.set(false);
    document.body.style.overflow = '';
    window.removeEventListener('keydown', this.onKeydown);
  }
}
