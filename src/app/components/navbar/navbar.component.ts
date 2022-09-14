import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { User } from 'src/app/shared';

const TRANSACTION_YEAR_STORAGE_KEY = 'transactionYear';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void { }

  get authenticatedUser(): User | null {
    return this.loginService.getUser();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  public resetToCurrentYear(): void {
    localStorage.removeItem(TRANSACTION_YEAR_STORAGE_KEY);
    this.router.navigate(['/']);
  }

  public hasTransactionYearSelected(): boolean {
    return !!localStorage.getItem(TRANSACTION_YEAR_STORAGE_KEY);
  }

  get getTransactionYear(): string {
    if (this.hasTransactionYearSelected()) {
      return localStorage.getItem(TRANSACTION_YEAR_STORAGE_KEY) as string;
    }
    return '';
  }
}
