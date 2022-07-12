import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Person } from 'src/app/shared/models/person.model';
import { ModalPersonComponent } from '../modal-person/modal-person.component';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-crud-person',
  templateUrl: './crud-person.component.html',
  styleUrls: ['./crud-person.component.css'],
})
export class CrudPersonComponent implements OnInit {
  person!: Person[];

  constructor(
    private personService: PersonService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllPersons();
  }

  public findAllPersons(): void {
    this.personService.getAllPersons().subscribe(
      (response: Person[]) => {
        this.person = response;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  public modalPerson(person?: Person): void {
    const modalRef = this.modalService.open(ModalPersonComponent);
    modalRef.componentInstance.person = person;
  }

  public deletePerson($event: any, person: Person): void {
    $event.preventDefault();
    if (
      confirm(`Tem certeza que deseja excluir a person ${person.name}?`) &&
      person.id
    ) {
      this.personService.deletePerson(person.id).subscribe(
        (response: any) => {
          this.findAllPersons();
        },
        (error: any) => {
          alert(error.message);
        }
      );
    }
  }

  public searchPerson(key: string): void {
    const results: Person[] = [];
    if (key.length > 1) {
      for (const person of this.person) {
        if (
          person?.name?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          person?.document?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          person?.phone?.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
          person?.stand?.name?.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
          results.push(person);
        }
      }
      this.person = results;
    } else {
      this.findAllPersons();
    }
  }
}
