import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionApplicationComponent } from './section-application.component';

describe('SectionApplicationComponent', () => {
  let component: SectionApplicationComponent;
  let fixture: ComponentFixture<SectionApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
