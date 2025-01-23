import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDeliveryServiceComponent } from './section-delivery-service.component';

describe('SectionDeliveryServiceComponent', () => {
  let component: SectionDeliveryServiceComponent;
  let fixture: ComponentFixture<SectionDeliveryServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDeliveryServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionDeliveryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
