import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOME_CONTENT } from '../../../content/home-content';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the couple names and wedding date', () => {
    const name = fixture.nativeElement.querySelector('.footer-name') as HTMLElement;
    const date = fixture.nativeElement.querySelector('.footer-date') as HTMLElement;
    expect(name.textContent?.trim()).toBe(HOME_CONTENT.couple.names);
    expect(date.textContent?.trim()).toBe(HOME_CONTENT.couple.weddingDate);
  });
});
