import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/shared/models/produto.model';
import { ModalProdutoComponent } from '../modal-produto';
import { ProdutoService } from '../services';

@Component({
  selector: 'app-crud-produto',
  templateUrl: './crud-produto.component.html',
  styleUrls: ['./crud-produto.component.css'],
})
export class CrudProdutoComponent implements OnInit {
  public produtos!: Produto[];

  constructor(
    private produtoService: ProdutoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  public listarProdutos(): void {
    this.produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  public modalProduto(produto?: Produto): void {
    const modalRef = this.modalService.open(ModalProdutoComponent);
    modalRef.componentInstance.produto = produto;
  }

  public excluirProduto($event: any, produto: Produto) {
    $event.preventDefault();
    if (
      confirm(`Tem certeza que deseja excluir o produto ${produto.nome}?`) &&
      produto.id
    ) {
      this.produtoService.deleteProduto(produto.id).subscribe(
        () => {
          this.listarProdutos();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public pesquisarProduto(key: string): void {
    const results: Produto[] = [];
    for (const produto of this.produtos) {
      if (produto?.nome?.includes(key) || produto?.descricao?.includes(key)) {
        results.push(produto);
      }
    }
    if (key === '') {
      this.listarProdutos();
    }
    this.produtos = results;
  }
}
