import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
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
  TransactionType,
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
  @ViewChild('datetime') datetime!: NgModel;

  modal_type!: ModalType;

  transaction!: Transaction;
  allTransactionTypes!: TransactionType[];
  transactionTypes!: TransactionType[];

  stands!: Stand[];
  person!: Person[];
  products!: Product[];

  constructor(
    public activeModal: NgbActiveModal,
    private transactionService: TransactionService,
    private productService: ProductService,
    private standService: StandService,
    private personService: PersonService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    if (!this.transaction) {
      this.modal_type = ModalType.CREATE;
      this.transaction = new Transaction();
    } else {
      this.modal_type = ModalType.UPDATE;
    }
    this.findAllStands();
    this.findAllPersons();
    this.findAllProducts();
    this.findAllTransactionTypes();
  }

  public findAllProducts(productName: string = ''): void {
    this.productService.getAllProducts({
      params: {
        query: productName,
      }
    }).subscribe((products) => {
      this.products = products;
    });
  }

  public findAllStands(standName: string = ''): void {
    this.standService.getAllStands({
      params: {
        query: standName,
      }
    }).subscribe((stands) => {
      this.stands = stands;
    });
  }

  public findAllPersons(personName: string = ''): void {
    this.personService.getAllPersons({
      params: {
        query: personName,
      }
    }).subscribe((person) => {
      this.person = person;
    });
  }

  public findAllTransactionTypes(): void {
    this.transactionService.getTransactionTypes().subscribe((transactionTypes) => {
      this.allTransactionTypes = transactionTypes;
      this.changeOperation();
    }
    );
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

  public changeOperation(): void {
    this.transactionTypes = this.allTransactionTypes.filter(
      (transactionType) => transactionType.operation === this.transaction.operation
    );
  }

  createPerson = (name: string) => {
    let person = new Person();
    person.name = name;
    this.personService.createPerson(person).subscribe((personCriada: Person) => {
      this.transaction.person = personCriada;
    });
    this.findAllPersons();
  };

  private validateTransaction() {
    if (this.transaction.operation == 'E') {
      this.transaction.stand = { id: 1 };
    }
  }

  public submitForm() {
    if (this.transactionForm.valid) {
      this.validateTransaction();
      this.transaction.datetime = this.datetime.value;
      if (this.modal_type === ModalType.CREATE) {
        this.createTransaction();
      } else {
        this.updateTransaction();
      }
    }
  }
}
