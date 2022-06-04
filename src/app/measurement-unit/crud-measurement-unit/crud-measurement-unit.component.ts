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
  public ums!: MeasurementUnit[];

  constructor(
    private measurementUnitService: MeasurementUnitService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllUMs();
  }

  public findAllUMs(): void {
    this.measurementUnitService.findAllMeasurementUnits().subscribe(
      (ums: MeasurementUnit[]) => {
        this.ums = ums;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  public modalUM(mu?: MeasurementUnit) {
    const modalRef = this.modalService.open(ModalMeasurementUnitComponent);
    modalRef.componentInstance.mu = mu;
  }

  public excluirUM($event: any, mu: MeasurementUnit) {
    $event.preventDefault();
    if (
      confirm(
        `Tem certeza que deseja excluir a unidade de medida '${mu.name}'?`
      ) &&
      mu.id
    ) {
      this.measurementUnitService.deleteUM(mu.id).subscribe(
        () => {
          this.findAllUMs();
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }

  public pesquisarUM(key: string): void {
    const results: MeasurementUnit[] = [];
    for (const mu of this.ums) {
      if (
        mu?.name?.toLowerCase().includes(key.toLowerCase()) ||
        mu?.abbreviation?.toLowerCase().includes(key.toLowerCase())
      ) {
        results.push(mu);
      }
    }
    this.ums = results;
  }
}
