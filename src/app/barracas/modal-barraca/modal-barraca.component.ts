import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PessoaService } from 'src/app/pessoas/services';
import { Barraca } from 'src/app/shared/models/barraca.model';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { BarracaService } from '../services/barraca.service';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-modal-barraca',
  templateUrl: './modal-barraca.component.html',
  styleUrls: ['./modal-barraca.component.css'],
})
export class ModalBarracaComponent implements OnInit {
  @ViewChild('barracaForm') barracaForm!: NgForm;
  barraca!: Barraca;
  pessoas!: Pessoa[];
  type!: ModalType;

  constructor(
    public activeModal: NgbActiveModal,
    private barracaService: BarracaService,
    private pessoaService: PessoaService
  ) {}

  ngOnInit(): void {
    if (!this.barraca) {
      this.barraca = new Barraca();
      this.type = ModalType.CREATE;
    } else {
      this.type = ModalType.UPDATE;
    }
    this.listarPessoas();
  }

  public listarPessoas() {
    this.pessoaService.getPessoas().subscribe((pessoas) => {
      this.pessoas = pessoas;
    });
  }

  public submitForm() {
    if (this.barracaForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.barracaService.addBarraca(this.barraca).subscribe(() => {
          this.activeModal.close();
          parent.location.reload();
        });
      } else {
        this.barracaService.updateBarraca(this.barraca).subscribe(() => {
          this.activeModal.close('Barraca atualizada com sucesso!');
        });
      }
    }
  }
}
