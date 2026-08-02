import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressCodeSection } from './dress-code-section';

describe('DressCodeSection', () => {
  let component: DressCodeSection;
  let fixture: ComponentFixture<DressCodeSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DressCodeSection],
    }).compileComponents();

    fixture = TestBed.createComponent(DressCodeSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
