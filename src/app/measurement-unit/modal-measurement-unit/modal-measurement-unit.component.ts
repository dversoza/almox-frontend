import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementUnit } from 'src/app/shared/models/measurement-unit.model';
import { MeasurementUnitService } from '../services';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-modal-measurement-unit',
  templateUrl: './modal-measurement-unit.component.html',
  styleUrls: ['./modal-measurement-unit.component.css'],
})
export class ModalMeasurementUnitComponent implements OnInit {
  @ViewChild('measurementUnitForm') measurementUnitForm!: NgForm;
  measurementUnit!: MeasurementUnit;
  type!: ModalType;

  constructor(
    public activeModal: NgbActiveModal,
    private measurementUnitService: MeasurementUnitService
  ) { }

  ngOnInit(): void {
    if (!this.measurementUnit) {
      this.measurementUnit = new MeasurementUnit();
      this.type = ModalType.CREATE;
    } else {
      this.type = ModalType.UPDATE;
    }
  }

  public submitForm() {
    if (this.measurementUnitForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.measurementUnitService.createMeasurementUnit(this.measurementUnit).subscribe(() => {
          this.activeModal.close();
          parent.location.reload();
        });
      } else {
        this.measurementUnitService.updateMeasurementUnit(this.measurementUnit).subscribe(() => {
          this.activeModal.close();
        });
      }
    }
  }
}
