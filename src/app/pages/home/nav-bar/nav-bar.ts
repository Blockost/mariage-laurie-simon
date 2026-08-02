import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { HOME_CONTENT } from '../../../content/home-content';
import { NavItem, NavLinks } from './nav-links/nav-links';

@Component({
  selector: 'app-nav-bar',
  imports: [NavLinks],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  protected readonly isSticky = signal(false);
  protected readonly isDrawerOpen = signal(false);

  protected readonly navItems: readonly NavItem[] = [
    { label: HOME_CONTENT.location.title, fragment: 'location' },
    { label: HOME_CONTENT.eventDetails.title, fragment: 'event-details' },
    { label: HOME_CONTENT.dressCode.title, fragment: 'dress-code' },
    { label: HOME_CONTENT.gift.title, fragment: 'gift' },
  ];

  private readonly navEl = viewChild.required<ElementRef<HTMLElement>>('navEl');

  // The navbar is the first element on the page, so while it's `position: static`
  // its own height is exactly how far you can scroll before it disappears above the
  // viewport. Using that as the sticky threshold (rather than an arbitrary pixel
  // value) means it flips to `position: sticky` at the instant it would otherwise
  // scroll out of view, with no gap where it's briefly invisible.
  private readonly onScroll = () => {
    const stickyThreshold = this.navEl().nativeElement.offsetHeight;
    this.isSticky.set(window.scrollY >= stickyThreshold);
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
