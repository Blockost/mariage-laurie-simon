import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavItem, NavLinks } from './nav-links';

const TEST_ITEMS: readonly NavItem[] = [
  { label: 'One', fragment: 'one' },
  { label: 'Two', fragment: 'two' },
];

describe('NavLinks', () => {
  let component: NavLinks;
  let fixture: ComponentFixture<NavLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLinks],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLinks);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('navItems', TEST_ITEMS);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one anchor per nav item, linking to its fragment', () => {
    const anchors = fixture.nativeElement.querySelectorAll('a.nav-link') as NodeListOf<HTMLAnchorElement>;
    expect(anchors.length).toBe(2);
    expect(anchors[0].textContent?.trim()).toBe('One');
    expect(anchors[0].getAttribute('href')).toBe('#one');
    expect(anchors[1].textContent?.trim()).toBe('Two');
    expect(anchors[1].getAttribute('href')).toBe('#two');
  });

  it('should emit linkActivated when a link is clicked', () => {
    let emitted = false;
    component.linkActivated.subscribe(() => (emitted = true));

    const anchor = fixture.nativeElement.querySelector('a.nav-link') as HTMLAnchorElement;
    anchor.click();

    expect(emitted).toBe(true);
  });
});
