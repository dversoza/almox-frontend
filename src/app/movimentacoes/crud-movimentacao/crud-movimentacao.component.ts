import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Movimentacao } from 'src/app/shared';
import { ModalMovimentacaoComponent } from '../modal-movimentacao/modal-movimentacao.component';
import { MovimentacaoService } from '../services';

@Component({
  selector: 'app-crud-movimentacao',
  templateUrl: './crud-movimentacao.component.html',
  styleUrls: ['./crud-movimentacao.component.css'],
})
export class CrudMovimentacaoComponent implements OnInit {
  public movimentacoes!: Movimentacao[];

  constructor(
    private movimentacaoService: MovimentacaoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarMovimentacoes();
  }

  public listarMovimentacoes(): void {
    this.movimentacaoService.getMovimentacoes().subscribe(
      (movimentacoes: Movimentacao[]) => {
        this.movimentacoes = movimentacoes;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  public modalMovimentacao(movimentacao?: Movimentacao) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };

    const modalRef = this.modalService.open(
      ModalMovimentacaoComponent,
      ngbModalOptions
    );
    modalRef.componentInstance.movimentacao = movimentacao;
  }

  public excluirMovimentacao($event: any, movimentacao: Movimentacao) {
    $event.preventDefault();
    if (
      confirm('Tem certeza que deseja excluir esta movimentação?') &&
      movimentacao.id
    ) {
      this.movimentacaoService.deleteMovimentacao(movimentacao.id).subscribe(
        () => {
          this.listarMovimentacoes();
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }

  public pesquisarMovimentacao(key: string): void {
    const results: Movimentacao[] = [];

    if (!key) {
      this.listarMovimentacoes();
      return;
    }

    for (const movimentacao of this.movimentacoes) {
      if (
        movimentacao.barraca?.nome?.toLowerCase().includes(key.toLowerCase()) ||
        movimentacao.produto?.nome?.toLowerCase().includes(key.toLowerCase()) ||
        movimentacao.quantidade?.toString().includes(key) ||
        movimentacao.valor?.toString().includes(key) ||
        movimentacao.pessoa?.nome?.toLowerCase().includes(key.toLowerCase())
      ) {
        results.push(movimentacao);
      }
    }
    this.movimentacoes = results;
  }
}
