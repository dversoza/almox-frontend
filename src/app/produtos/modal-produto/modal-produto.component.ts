import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/shared/models/produto.model';
import { UnidadeMedida } from 'src/app/shared/models/unidade-medida.model';
import { UnidadeMedidaService } from 'src/app/ums/services';
import { ProdutoService } from '../services';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.css'],
})
export class ModalProdutoComponent implements OnInit {
  @ViewChild('produtoForm') produtoForm!: NgForm;
  produto!: Produto;
  ums!: UnidadeMedida[];
  type!: ModalType;

  constructor(
    public activeModal: NgbActiveModal,
    private produtoService: ProdutoService,
    private umService: UnidadeMedidaService
  ) {}

  ngOnInit(): void {
    if (!this.produto) {
      this.produto = new Produto();
      this.type = ModalType.CREATE;
    } else {
      this.type = ModalType.UPDATE;
    }
    this.listarUMs();
  }

  public listarUMs() {
    this.umService.getUM().subscribe((ums: UnidadeMedida[]) => {
      this.ums = ums;
    });
  }

  public submitForm() {
    if (this.produtoForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.produtoService.addProduto(this.produto).subscribe(
          () => {
            this.activeModal.close();
            parent.location.reload();
          },
          (error) => {
            alert(error.message);
          }
        );
      } else {
        this.produtoService.updateProduto(this.produto).subscribe(() => {
          this.activeModal.close();
          parent.location.reload();
        });
      }
    }
  }
}
