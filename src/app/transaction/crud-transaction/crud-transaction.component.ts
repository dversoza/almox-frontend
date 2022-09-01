import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { Transaction, User } from 'src/app/shared';
import { ModalTransactionComponent } from '../modal-transaction/modal-transaction.component';
import { TransactionService } from '../services';

@Component({
  selector: 'app-crud-transaction',
  templateUrl: './crud-transaction.component.html',
  styleUrls: ['./crud-transaction.component.css'],
})
export class CrudTransactionComponent implements OnInit {
  public transactions!: Transaction[];

  constructor(
    private transactionService: TransactionService,
    private modalService: NgbModal,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.findAllTransactions();
  }

  get authUser(): User | null {
    return this.loginService.getUser();
  }

  public findAllTransactions(): void {
    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    }), (error: any) => {
      alert(error.message);
    }
  }

  public modalTransaction(transaction?: Transaction) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };

    const modalRef = this.modalService.open(
      ModalTransactionComponent,
      ngbModalOptions
    );
    modalRef.componentInstance.transaction = transaction;
  }

  public deleteTransaction($event: any, transaction: Transaction) {
    $event.preventDefault();
    if (
      confirm('Tem certeza que deseja excluir esta movimentação?') &&
      transaction.id
    ) {
      this.transactionService.deleteTransaction(transaction.id).subscribe(
        () => {
          this.findAllTransactions();
        },
        (error) => {
          alert(error.message);
        }
      );
    }
  }

  public searchTransaction(key: string): void {
    const results: Transaction[] = [];

    if (!key) {
      this.findAllTransactions();
      return;
    }

    for (const transaction of this.transactions) {
      if (
        transaction.stand?.name?.toLowerCase().includes(key.toLowerCase()) ||
        transaction.product?.name?.toLowerCase().includes(key.toLowerCase()) ||
        transaction.quantity?.toString().includes(key) ||
        transaction.price?.toString().includes(key) ||
        transaction.person?.name?.toLowerCase().includes(key.toLowerCase())
      ) {
        results.push(transaction);
      }
    }
    this.transactions = results;
  }
}
