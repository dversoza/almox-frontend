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
  persons!: Person[];

  currentPage: number = 1;

  constructor(
    private personService: PersonService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.findAllPersons();
  }

  public findAllPersons(query: string = ''): void {
    this.personService.getAllPersons({
      params: { page: this.currentPage, query }
    }).subscribe((response: Person[]) => { this.persons = response; }),
      (error: any) => { alert(error.message); }
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
      this.personService.deletePerson(person.id)
        .subscribe(() => { this.findAllPersons(); }),
        (error: any) => { alert(error.message); }
    }
  }

  public nextPage(): void {
    this.currentPage++;
    this.findAllPersons();
  }

  public previousPage(): void {
    this.currentPage--;
    this.findAllPersons();
  }

  public hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public hasNextPage(): boolean {
    return this.persons?.length == 10;
  }
}
