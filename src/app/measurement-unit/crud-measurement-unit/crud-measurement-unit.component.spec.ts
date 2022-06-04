import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMeasurementUnitComponent } from './crud-measurement-unit.component';

describe('CrudMeasurementUnitComponent', () => {
  let component: CrudMeasurementUnitComponent;
  let fixture: ComponentFixture<CrudMeasurementUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudMeasurementUnitComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMeasurementUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
