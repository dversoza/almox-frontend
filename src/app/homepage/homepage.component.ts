import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../auth/services/login.service';
import { User } from '../shared';

const backendBaseUrl: string = `${environment.baseUrl}`;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  public REPORTS = [
    {
      name: 'Listagem de Barracas',
      url: `${backendBaseUrl}/reports/stands/`,
    },
    {
      name: 'Listagem de Produtos',
      url: `${backendBaseUrl}/reports/products/`,
    },
    {
      name: 'Estoque',
      url: `${backendBaseUrl}/reports/stock/`,
    },
  ];

  constructor(private loginService: LoginService) {}

  get authUser(): User | null {
    return this.loginService.getUser();
  }

  ngOnInit(): void {}
}
