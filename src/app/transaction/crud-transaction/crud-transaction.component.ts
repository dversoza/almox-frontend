import { HttpErrorResponse } from '@angular/common/http';
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

  public loading = true;
  private currentPage = 1;

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

  public findAllTransactions(query: string = ''): void {
    this.transactionService.getTransactions({
      params: {
        page: this.currentPage,
        query,
      },
    }).subscribe((transactions) => {
      this.transactions = transactions;
      this.loading = false;
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
        }),
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
    }
  }

  public nextPage(): void {
    this.currentPage++;
    this.findAllTransactions();
  }

  public previousPage(): void {
    this.currentPage--;
    this.findAllTransactions();
  }

  public hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  public hasNextPage(): boolean {
    return this.transactions?.length == 10;
  }
}
