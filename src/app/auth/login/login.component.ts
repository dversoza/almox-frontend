import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  login!: Login;

  loading: boolean = true;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.login = new Login();
    this.route.queryParams.subscribe((params) => {
      this.message = params['error'];
      this.loading = false;
    });
  }

  authenticate(): void {
    this.loading = true;

    this.loginService.login(this.login).subscribe({
      next: (auth_success) => {
        this.loginService.setToken(auth_success.token);
        this.loginService.setUser(auth_success.user);
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (auth_err: HttpErrorResponse) => {
        this.loading = false;
        this.message = "Usuário ou senha inválidos!";
        console.log(auth_err);
      },
    });
  }
}
