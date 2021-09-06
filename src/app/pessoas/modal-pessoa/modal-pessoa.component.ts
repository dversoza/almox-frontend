import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BarracaService } from 'src/app/barracas/services/barraca.service';
import { Barraca } from 'src/app/shared/models/barraca.model';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoaService } from '../services';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'modal-pessoa',
  templateUrl: './modal-pessoa.component.html',
  styleUrls: ['./modal-pessoa.component.css'],
})
export class ModalPessoaComponent implements OnInit {
  @ViewChild('pessoaForm') pessoaForm!: NgForm;
  type!: ModalType;
  pessoa!: Pessoa;
  barracas!: Barraca[];

  constructor(
    public activeModal: NgbActiveModal,
    private pessoaService: PessoaService,
    private barracaService: BarracaService
  ) {}

  ngOnInit(): void {
    if (!this.pessoa) {
      this.type = ModalType.CREATE;
      this.pessoa = new Pessoa();
    } else {
      this.type = ModalType.UPDATE;
    }
    this.listarBarracas();
  }

  public listarBarracas(): void {
    this.barracaService.getBarracas().subscribe(
      (response: Barraca[]) => {
        this.barracas = response;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  private pessoaFactory(pessoa: Pessoa): any {
    if (this.type === ModalType.CREATE) {
      return this.pessoaService.criarPessoa(pessoa);
    } else {
      return this.pessoaService.atualizarPessoa(pessoa);
    }
  }

  public submitForm(): void {
    if (this.pessoaForm.valid) {
      this.pessoaFactory(this.pessoa).subscribe(
        (response: Pessoa) => {
          this.activeModal.close();
          parent.location.reload();
        },
        (error: any) => {
          alert(error.message);
        }
      );
    }
  }
}
