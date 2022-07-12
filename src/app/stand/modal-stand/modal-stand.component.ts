import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonService } from 'src/app/person/services';
import { Stand } from 'src/app/shared/models/stand.model';
import { Person } from 'src/app/shared/models/person.model';
import { StandService } from '../services/stand.service';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-modal-stand',
  templateUrl: './modal-stand.component.html',
  styleUrls: ['./modal-stand.component.css'],
})
export class ModalStandComponent implements OnInit {
  @ViewChild('standForm') standForm!: NgForm;
  stand!: Stand;
  person!: Person[];
  type!: ModalType;

  constructor(
    public activeModal: NgbActiveModal,
    private standService: StandService,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    if (!this.stand) {
      this.stand = new Stand();
      this.type = ModalType.CREATE;
    } else {
      this.type = ModalType.UPDATE;
    }
    this.findAllPersons();
  }

  public findAllPersons() {
    this.personService.getAllPersons().subscribe((person) => {
      this.person = person;
    });
  }

  public submitForm() {
    if (this.standForm.valid) {
      if (this.type === ModalType.CREATE) {
        this.standService.createStand(this.stand).subscribe(() => {
          this.activeModal.close();
          parent.location.reload();
        });
      } else {
        this.standService.updateStand(this.stand).subscribe(() => {
          this.activeModal.close('Stand atualizada com sucesso!');
        });
      }
    }
  }
}
