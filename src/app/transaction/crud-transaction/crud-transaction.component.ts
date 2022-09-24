import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { Transaction, TransactionType, User } from 'src/app/shared';
import { ModalTransactionComponent } from '../modal-transaction/modal-transaction.component';
import { TransactionService } from '../services';

@Component({
  selector: 'app-crud-transaction',
  templateUrl: './crud-transaction.component.html',
  styleUrls: ['./crud-transaction.component.css'],
})
export class CrudTransactionComponent implements OnInit {
  public transactions!: Transaction[];
  public transactionTypes!: TransactionType[];

  public loading = true;

  private currentPage = 1;

  public queryFilter?: string;
  public typeFilter?: TransactionType;
  public startDateFilter?: string;
  public endDateFilter?: string;

  constructor(
    private transactionService: TransactionService,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.findAllTransactions();
    this.findAllTransactionTypes();
  }

  get authUser(): User | null {
    return this.loginService.getUser();
  }

  public findAllTransactions(): void {
    console.log(this.startDateFilter);
    let filters = {
      page: this.currentPage,
      ...(this.queryFilter && { query: this.queryFilter }),
      ...(this.typeFilter && { type: this.typeFilter.id }),
      ...(this.startDateFilter && { start_date: new Date(this.startDateFilter).toISOString() }),
      ...(this.endDateFilter && { end_date: new Date(this.endDateFilter).toISOString() }),
    };

    this.transactionService.getTransactions({ params: filters }).subscribe({
      next: (transactions: Transaction[]) => {
        this.transactions = transactions;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  public findAllTransactionTypes(): void {
    this.transactionService.getTransactionTypes().subscribe({
      next: (transactionTypes: TransactionType[]) => {
        this.transactionTypes = transactionTypes;
      },
    });
  }

  public modalTransaction(transaction?: Transaction) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };

    const modalRef = this.modalService.open(ModalTransactionComponent, ngbModalOptions);
    modalRef.componentInstance.transaction = transaction;
  }

  public deleteTransaction($event: any, transaction: Transaction) {
    $event.preventDefault();
    if (confirm('Tem certeza que deseja excluir esta movimentação?') && transaction.id) {
      this.transactionService.deleteTransaction(transaction.id).subscribe({
        next: () => {
          this.findAllTransactions();
        },
      });
    }
  }

  public handleSelectTransactionTypeFilter(transactionType: TransactionType): void {
    this.typeFilter = transactionType;
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

  public normalizedMeasurementUnitName(transaction: Transaction): string | undefined {
    if (transaction.quantity == 1) {
      return transaction.product?.measurement_unit?.abbreviation?.toLowerCase();
    } else {
      return `${transaction.product?.measurement_unit?.abbreviation}s`.toLowerCase();
    }
  }
}
