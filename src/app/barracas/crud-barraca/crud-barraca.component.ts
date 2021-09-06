import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Barraca } from 'src/app/shared/models/barraca.model';
import { ModalBarracaComponent } from '../modal-barraca';
import { BarracaService } from '../services/barraca.service';

@Component({
  selector: 'app-crud-barraca',
  templateUrl: './crud-barraca.component.html',
  styleUrls: ['./crud-barraca.component.css'],
})
export class CrudBarracaComponent implements OnInit {
  public barracas!: Barraca[];

  constructor(
    private barracaService: BarracaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarBarracas();
  }

  public listarBarracas(): void {
    this.barracaService.getBarracas().subscribe(
      (response: Barraca[]) => {
        this.barracas = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public modalBarraca(barraca?: Barraca) {
    const modalRef = this.modalService.open(ModalBarracaComponent);
    modalRef.componentInstance.barraca = barraca;
  }

  public pesquisarBarraca(key: string): void {
    const results: Barraca[] = [];
    for (const barraca of this.barracas) {
      if (
        barraca?.nome?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        barraca?.contato?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        barraca?.responsavel?.nome?.toLowerCase().indexOf(key.toLowerCase()) !==
          -1
      ) {
        results.push(barraca);
      }
    }
    this.barracas = results;
  }

  public excluirBarraca($event: any, barraca: Barraca) {
    $event.preventDefault();
    if (
      confirm(`Tem certeza que deseja excluir a barraca ${barraca.nome}?`) &&
      barraca.id
    ) {
      this.barracaService.deleteBarraca(barraca.id).subscribe(
        () => {
          this.listarBarracas();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
}
