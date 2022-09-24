import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  get authenticatedUser(): User | null {
    return this.loginService.getUser();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
