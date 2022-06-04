import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMeasurementUnitComponent } from './modal-measurement-unit.component';

describe('ModalMeasurementUnitComponent', () => {
  let component: ModalMeasurementUnitComponent;
  let fixture: ComponentFixture<ModalMeasurementUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalMeasurementUnitComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMeasurementUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
