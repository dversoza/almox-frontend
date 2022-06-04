import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login.model';
import { UserService } from 'src/app/user/services/user.service';
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
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.loginService.authUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.login = new Login();
    this.route.queryParams.subscribe((params) => {
      this.message = params['error'];
    });
  }

  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe((user) => {
        if (user) {
          this.loginService.authUser = user;
          this.loading = false;
          this.router.navigate(['/']);
        } else {
          this.loading = false;
          this.message = 'Usuário ou password inválidos';
        }
      });
    }
  }
}
