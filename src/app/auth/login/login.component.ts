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
  loading: boolean = false;
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
    });
  }

  authenticate(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe((login_response) => {
        if (login_response) {
          this.loginService.setToken(login_response.token);
          this.loginService.setUser(login_response.user);
          this.loading = false;
          this.router.navigate(['/']);
        } else {
          this.loading = false;
          this.message = 'Usuário ou senha inválidos';
        }
      });
    }
  }
}
