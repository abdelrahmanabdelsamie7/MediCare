import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDetailsComponent } from './medicine-details.component';

describe('MedicineDetailsComponent', () => {
  let component: MedicineDetailsComponent;
  let fixture: ComponentFixture<MedicineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
