import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HOME_CONTENT } from '../../../content/home-content';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the couple names and wedding date', () => {
    const name = fixture.nativeElement.querySelector('.hero-name') as HTMLElement;
    const date = fixture.nativeElement.querySelector('.hero-date') as HTMLElement;
    expect(name.textContent?.trim()).toBe(HOME_CONTENT.couple.names);
    expect(date.textContent?.trim()).toBe(HOME_CONTENT.couple.weddingDate);
  });
});
