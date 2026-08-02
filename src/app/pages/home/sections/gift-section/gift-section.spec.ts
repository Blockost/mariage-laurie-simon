import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftSection } from './gift-section';

describe('GiftSection', () => {
  let component: GiftSection;
  let fixture: ComponentFixture<GiftSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftSection],
    }).compileComponents();

    fixture = TestBed.createComponent(GiftSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
