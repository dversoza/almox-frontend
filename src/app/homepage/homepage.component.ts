import { Component, OnInit } from '@angular/core';


const TRANSACTION_YEAR_STORAGE_KEY = 'transactionYear';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  AVAILABLE_YEARS = ['2020', '2021']
  constructor() { }

  ngOnInit(): void { }

  public setTransactionYear(year: string): void {
    localStorage.setItem(TRANSACTION_YEAR_STORAGE_KEY, year);
  }

  get eventEdition(): string {
    const selected_year = localStorage.getItem(TRANSACTION_YEAR_STORAGE_KEY);
    if (selected_year) {
      return (parseInt(selected_year) - 1952).toString();
    } else {
      return (new Date().getFullYear() - 1952).toString();
    }
  }
}
