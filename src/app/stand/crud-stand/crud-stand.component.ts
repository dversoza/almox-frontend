import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private standService: StandService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllStands();
  }

  public findAllStands(): void {
    this.standService.getAllStands().subscribe(
      (response: Stand[]) => {
        this.stands = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public modalStand(stand?: Stand) {
    const modalRef = this.modalService.open(ModalStandComponent);
    modalRef.componentInstance.stand = stand;
  }

  public detailStand(stand: Stand): void {
    this.router.navigate(['/stands', stand.id]);
  }

  public searchStand(key: string): void {
    const results: Stand[] = [];
    for (const stand of this.stands) {
      if (
        stand?.name?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        stand?.contact?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        stand?.manager?.name?.toLowerCase().indexOf(key.toLowerCase()) !==
        -1
      ) {
        results.push(stand);
      }
    }
    this.stands = results;
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
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }
}
