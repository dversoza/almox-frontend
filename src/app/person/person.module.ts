import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudPersonComponent } from './crud-person';
import { RouterModule } from '@angular/router';
import { PersonService } from './services/person.service';
import { ModalPersonComponent } from './modal-person/modal-person.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [CrudPersonComponent, ModalPersonComponent],
  imports: [CommonModule, RouterModule, FormsModule, NgSelectModule, SharedModule],
  providers: [PersonService],
})
export class PersonsModule {}
