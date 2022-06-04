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
  @ViewChild('umForm') umForm!: NgForm;
  mu!: MeasurementUnit;
  type!: ModalType;

  constructor(
    public activeModal: NgbActiveModal,
    private umService: MeasurementUnitService
  ) { }

  ngOnInit(): void {
    if (!this.mu) {
      this.mu = new MeasurementUnit();
      this.type = ModalType.CREATE;
    } else {
      this.type = ModalType.UPDATE;
    }
  }

  public submitForm() {
    if (this.umForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.umService.createUM(this.mu).subscribe(() => {
          this.activeModal.close();
          parent.location.reload();
        });
      } else {
        this.umService.updateUM(this.mu).subscribe(() => {
          this.activeModal.close();
        });
      }
    }
  }
}
