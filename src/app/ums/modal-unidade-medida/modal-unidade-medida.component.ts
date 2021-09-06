import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadeMedida } from 'src/app/shared/models/unidade-medida.model';
import { UnidadeMedidaService } from '../services';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-modal-unidade-medida',
  templateUrl: './modal-unidade-medida.component.html',
  styleUrls: ['./modal-unidade-medida.component.css'],
})
export class ModalUnidadeMedidaComponent implements OnInit {
  @ViewChild('umForm') umForm!: NgForm;
  um!: UnidadeMedida;
  type!: ModalType;

  constructor(
    public activeModal: NgbActiveModal,
    private umService: UnidadeMedidaService
  ) {}

  ngOnInit(): void {
    if (!this.um) {
      this.um = new UnidadeMedida();
      this.type = ModalType.CREATE;
    } else {
      this.type = ModalType.UPDATE;
    }
  }

  public submitForm() {
    if (this.umForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.umService.createUM(this.um).subscribe(() => {
          this.activeModal.close();
          parent.location.reload();
        });
      } else {
        this.umService.updateUM(this.um).subscribe(() => {
          this.activeModal.close();
        });
      }
    }
  }
}
