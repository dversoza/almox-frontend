import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { ModalPessoaComponent } from '../modal-pessoa/modal-pessoa.component';
import { PessoaService } from '../services/pessoa.service';

@Component({
  selector: 'app-crud-pessoa',
  templateUrl: './crud-pessoa.component.html',
  styleUrls: ['./crud-pessoa.component.css'],
})
export class CrudPessoaComponent implements OnInit {
  pessoas!: Pessoa[];

  constructor(
    private pessoaService: PessoaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarPessoas();
  }

  public listarPessoas(): void {
    this.pessoaService.getPessoas().subscribe(
      (response: Pessoa[]) => {
        this.pessoas = response;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  public modalPessoa(pessoa?: Pessoa): void {
    const modalRef = this.modalService.open(ModalPessoaComponent);
    modalRef.componentInstance.pessoa = pessoa;
  }

  public excluirPessoa($event: any, pessoa: Pessoa): void {
    $event.preventDefault();
    if (
      confirm(`Tem certeza que deseja excluir a pessoa ${pessoa.nome}?`) &&
      pessoa.id
    ) {
      this.pessoaService.excluirPessoa(pessoa.id).subscribe(
        (response: any) => {
          this.listarPessoas();
        },
        (error: any) => {
          alert(error.message);
        }
      );
    }
  }

  public pesquisarPessoa(key: string): void {
    const results: Pessoa[] = [];
    if (key.length > 1) {
      for (const pessoa of this.pessoas) {
        if (
          pessoa?.nome?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          pessoa?.documento?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          pessoa?.telefone?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          pessoa?.barraca?.nome?.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
          results.push(pessoa);
        }
      }
      this.pessoas = results;
    } else {
      this.listarPessoas();
    }
  }
}
