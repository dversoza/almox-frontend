import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StandService } from 'src/app/stand/services/stand.service';
import { Stand } from 'src/app/shared/models/stand.model';
import { Person } from 'src/app/shared/models/person.model';
import { PersonService } from '../services';
import { HttpErrorResponse } from '@angular/common/http';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'modal-person',
  templateUrl: './modal-person.component.html',
  styleUrls: ['./modal-person.component.css'],
})
export class ModalPersonComponent implements OnInit {
  @ViewChild('personForm') personForm!: NgForm;
  type!: ModalType;
  person!: Person;
  stands!: Stand[];

  constructor(
    public activeModal: NgbActiveModal,
    private personService: PersonService,
    private standService: StandService
  ) { }

  ngOnInit(): void {
    if (!this.person) {
      this.type = ModalType.CREATE;
      this.person = new Person();
    } else {
      this.type = ModalType.UPDATE;
    }
    this.findStands();
  }

  public findStands(standName: string = ''): void {
    this.standService.getAllStands({
      params: {
        query: standName,
      },
    }).subscribe({
      next: (stands: Stand[]) => {
        this.stands = stands;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  private personFactory(person: Person): any {
    if (this.type === ModalType.CREATE) {
      return this.personService.createPerson(person);
    } else {
      return this.personService.updatePerson(person);
    }
  }

  public submitForm(): void {
    if (this.personForm.valid) {
      this.personFactory(this.person).subscribe({
        next: () => {
          this.activeModal.close();
          parent.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }
}
