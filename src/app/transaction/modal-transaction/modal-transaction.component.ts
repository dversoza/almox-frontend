import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { StandService } from 'src/app/stand/services/stand.service';
import { PersonService } from 'src/app/person/services';
import { ProductService } from 'src/app/product/services';
import {
  Stand,
  Transaction,
  Person,
  Product,
  MeasurementUnit,
} from 'src/app/shared';
import { TransactionService } from '../services';

enum ModalType {
  CREATE,
  UPDATE,
}

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.css'],
})
export class ModalTransactionComponent implements OnInit {
  @ViewChild('transactionForm') transactionForm!: NgForm;

  type!: ModalType;

  transaction!: Transaction;
  stands!: Stand[];
  person!: Person[];
  products!: Product[];
  mu?: MeasurementUnit;

  constructor(
    public activeModal: NgbActiveModal,
    private transactionService: TransactionService,
    private productService: ProductService,
    private standService: StandService,
    private personService: PersonService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    if (!this.transaction) {
      this.type = ModalType.CREATE;
      this.transaction = new Transaction();
    } else {
      this.type = ModalType.UPDATE;
      this.mu = this.transaction.product?.measurement_unit;
    }
    this.findAllStands();
    this.findAllPersons();
    this.findAllProducts();
  }

  public findAllProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  public findAllStands(): void {
    this.standService.getAllStands().subscribe((stands) => {
      this.stands = stands;
    });
  }

  public findAllPersons(): void {
    this.personService.getAllPersons().subscribe((person) => {
      this.person = person;
    });
  }

  private createTransaction(): void {
    this.transactionService
      .createTransaction(this.transaction)
      .subscribe((transaction) => {
        this.activeModal.close();
        parent.location.reload();
      });
  }

  private updateTransaction(): void {
    this.transactionService
      .updateTransaction(this.transaction)
      .subscribe((transaction) => {
        this.activeModal.close();
        parent.location.reload();
      });
  }

  createPerson = (name: string) => {
    let person = new Person();
    person.name = name;
    this.personService.createPerson(person).subscribe((personCriada: Person) => {
      this.transaction.person = personCriada;
      this.findAllPersons();
    });
  };

  private validateTransaction() {
    if (this.transaction.way == 'ENTRADA') {
      this.transaction.stand = { id: 1 };
      this.transaction.person = this.loginService.getUser()?.person;
    }
  }

  public submitForm() {
    if (this.transactionForm.valid) {
      this.validateTransaction();
      if (this.type === ModalType.CREATE) {
        this.createTransaction();
      } else {
        this.updateTransaction();
      }
    }
  }
}
