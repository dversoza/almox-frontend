import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Stand } from 'src/app/shared/models/stand.model';
import { ModalStandComponent } from '../modal-stand';
import { StandService } from '../services/stand.service';

@Component({
  selector: 'app-crud-stand',
  templateUrl: './crud-stand.component.html',
  styleUrls: ['./crud-stand.component.css'],
})
export class CrudStandComponent implements OnInit {
  public stands!: Stand[];

  public loading = true;
  private currentPage: number = 1;

  constructor(
    private standService: StandService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllStands();
  }

  public findAllStands(query: string = ''): void {
    this.standService.getAllStands({
      params: {
        page: this.currentPage,
        query,
      }
    }).subscribe(
      (response: Stand[]) => {
        this.stands = response;
        this.loading = false;
      }), (error: HttpErrorResponse) => {
        alert(error.message);
      }
  }

  public modalStand(stand?: Stand) {
    const modalRef = this.modalService.open(ModalStandComponent);
    modalRef.componentInstance.stand = stand;
  }

  public deleteStand($event: any, stand: Stand) {
    $event.preventDefault();
    if (
      confirm(`Tem certeza que deseja excluir a stand ${stand.name}?`) &&
      stand.id
    ) {
      this.standService.deleteStand(stand.id).subscribe(
        () => {
          this.findAllStands();
        }), (error: HttpErrorResponse) => {
          alert(error.message);
        }
    }
  }

  public nextPage(): void {
    this.currentPage++;
    this.findAllStands();
  }

  public previousPage(): void {
    this.currentPage--;
    this.findAllStands();
  }

  public hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public hasNextPage(): boolean {
    return this.stands ? this.stands.length == 10 : false;
  }
}
