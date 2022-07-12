import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MeasurementUnit } from 'src/app/shared/models/measurement-unit.model';
import { ModalMeasurementUnitComponent } from '../modal-measurement-unit/modal-measurement-unit.component';
import { MeasurementUnitService } from '../services';

@Component({
  selector: 'app-crud-measurement-unit',
  templateUrl: './crud-measurement-unit.component.html',
  styleUrls: ['./crud-measurement-unit.component.css'],
})
export class CrudMeasurementUnitComponent implements OnInit {
  public measurementUnits!: MeasurementUnit[];

  constructor(
    private measurementUnitService: MeasurementUnitService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllMeasurementUnits();
  }

  public findAllMeasurementUnits(): void {
    this.measurementUnitService.findAllMeasurementUnits().subscribe(
      (response) => {
        this.measurementUnits = response;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  public modalMeasurementUnit(measurementUnit?: MeasurementUnit) {
    const modalRef = this.modalService.open(ModalMeasurementUnitComponent);
    modalRef.componentInstance.measurementUnit = measurementUnit;
  }

  public deleteMeasurementUnit($event: any, measurementUnit: MeasurementUnit) {
    $event.preventDefault();
    if (
      confirm(
        `Tem certeza que deseja excluir a unidade de medida '${measurementUnit.name}'?`
      ) &&
      measurementUnit.id
    ) {
      this.measurementUnitService.deleteMeasurementUnit(measurementUnit.id).subscribe(
        () => {
          this.findAllMeasurementUnits();
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }

  public searchMeasurementUnit(key: string): void {
    const results: MeasurementUnit[] = [];
    for (const measurementUnit of this.measurementUnits) {
      if (
        measurementUnit?.name?.toLowerCase().includes(key.toLowerCase()) ||
        measurementUnit?.abbreviation?.toLowerCase().includes(key.toLowerCase())
      ) {
        results.push(measurementUnit);
      }
    }
    this.measurementUnits = results;
  }
}
