import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { BarracaService } from 'src/app/barracas/services/barraca.service';
import { PessoaService } from 'src/app/pessoas/services';
import { ProdutoService } from 'src/app/produtos/services';
import {
  Barraca,
  Movimentacao,
  Pessoa,
  Produto,
  UnidadeMedida,
} from 'src/app/shared';
import { MovimentacaoService } from '../services';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-modal-movimentacao',
  templateUrl: './modal-movimentacao.component.html',
  styleUrls: ['./modal-movimentacao.component.css'],
})
export class ModalMovimentacaoComponent implements OnInit {
  @ViewChild('movimentacaoForm') movimentacaoForm!: NgForm;

  type!: ModalType;

  movimentacao!: Movimentacao;
  barracas!: Barraca[];
  pessoas!: Pessoa[];
  produtos!: Produto[];
  um?: UnidadeMedida;

  constructor(
    public activeModal: NgbActiveModal,
    private movimentacaoService: MovimentacaoService,
    private produtoService: ProdutoService,
    private barracaService: BarracaService,
    private pessoaService: PessoaService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (!this.movimentacao) {
      this.type = ModalType.CREATE;
      this.movimentacao = new Movimentacao();
      this.movimentacao.usuario = this.loginService.usuarioLogado
        ? this.loginService.usuarioLogado
        : undefined;
      this.movimentacao.usuarioCriacao = this.loginService.usuarioLogado
        ? this.loginService.usuarioLogado
        : undefined;
      this.movimentacao.usuarioModificacao = this.loginService.usuarioLogado
        ? this.loginService.usuarioLogado
        : undefined;
    } else {
      this.type = ModalType.UPDATE;
      this.movimentacao.usuarioModificacao = this.loginService.usuarioLogado
        ? this.loginService.usuarioLogado
        : undefined;
      this.um = this.movimentacao.produto?.unidadeMedida;
    }
    this.listarBarracas();
    this.listarPessoas();
    this.listarProdutos();
  }

  public listarProdutos(): void {
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  public listarBarracas(): void {
    this.barracaService.getBarracas().subscribe((barracas) => {
      this.barracas = barracas;
    });
  }

  public listarPessoas(): void {
    this.pessoaService.getPessoas().subscribe((pessoas) => {
      this.pessoas = pessoas;
    });
  }

  private criarMovimentacao(): void {
    this.movimentacaoService
      .createMovimentacao(this.movimentacao)
      .subscribe((movimentacao) => {
        this.activeModal.close();
        parent.location.reload();
      });
  }

  private atualizarMovimentacao(): void {
    this.movimentacaoService
      .updateMovimentacao(this.movimentacao)
      .subscribe((movimentacao) => {
        this.activeModal.close();
        parent.location.reload();
      });
  }

  criarPessoa = (nome: string) => {
    let pessoa = new Pessoa();
    pessoa.nome = nome;
    this.pessoaService.criarPessoa(pessoa).subscribe((pessoaCriada: Pessoa) => {
      this.movimentacao.pessoa = pessoaCriada;
      this.listarPessoas();
    });
  };

  public submitForm() {
    if (this.movimentacaoForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.criarMovimentacao();
      } else {
        this.atualizarMovimentacao();
      }
    }
  }
}
