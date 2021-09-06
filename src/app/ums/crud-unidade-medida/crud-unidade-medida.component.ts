import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnidadeMedida } from 'src/app/shared/models/unidade-medida.model';
import { ModalUnidadeMedidaComponent } from '../modal-unidade-medida/modal-unidade-medida.component';
import { UnidadeMedidaService } from '../services';

@Component({
  selector: 'app-crud-unidade-medida',
  templateUrl: './crud-unidade-medida.component.html',
  styleUrls: ['./crud-unidade-medida.component.css'],
})
export class CrudUnidadeMedidaComponent implements OnInit {
  public ums!: UnidadeMedida[];

  constructor(
    private unidadeMedidaService: UnidadeMedidaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarUMs();
  }

  public listarUMs(): void {
    this.unidadeMedidaService.getUM().subscribe(
      (ums: UnidadeMedida[]) => {
        this.ums = ums;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  public modalUM(um?: UnidadeMedida) {
    const modalRef = this.modalService.open(ModalUnidadeMedidaComponent);
    modalRef.componentInstance.um = um;
  }

  public excluirUM($event: any, um: UnidadeMedida) {
    $event.preventDefault();
    if (
      confirm(
        `Tem certeza que deseja excluir a unidade de medida '${um.nome}'?`
      ) &&
      um.id
    ) {
      this.unidadeMedidaService.deleteUM(um.id).subscribe(
        () => {
          this.listarUMs();
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }

  public pesquisarUM(key: string): void {
    const results: UnidadeMedida[] = [];
    for (const um of this.ums) {
      if (
        um?.nome?.toLowerCase().includes(key.toLowerCase()) ||
        um?.sigla?.toLowerCase().includes(key.toLowerCase())
      ) {
        results.push(um);
      }
    }
    this.ums = results;
  }
}
