import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsSection } from './event-details-section';

describe('EventDetailsSection', () => {
  let component: EventDetailsSection;
  let fixture: ComponentFixture<EventDetailsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
