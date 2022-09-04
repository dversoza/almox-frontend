import { HttpErrorResponse } from '@angular/common/http';
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

  private currentPage: number = 1;

  constructor(
    private measurementUnitService: MeasurementUnitService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllMeasurementUnits();
  }

  public findAllMeasurementUnits(): void {
    this.measurementUnitService.findAllMeasurementUnits(this.currentPage).subscribe(
      (response) => {
        this.measurementUnits = response;
      }),
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
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
        }),
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    }
  }

  public nextPage(): void {
    this.currentPage++;
    this.findAllMeasurementUnits();
  }

  public previousPage(): void {
    this.currentPage--;
    this.findAllMeasurementUnits();
  }

  public hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public hasNextPage(): boolean {
    return this.measurementUnits.length == 10;
  }
}
