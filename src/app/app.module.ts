import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { PersonsModule } from './person';
import { ProductModule } from './product/products.module';
import { SharedModule } from './shared';
import { StandModule } from './stand';
import { TransactionModule } from './transaction';
import { HttpErrorInterceptorService } from './http-interceptors/http-errors-interceptor';

const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptorService,
    multi: true,
  },
];

registerLocaleData(localePt);
@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, HomepageComponent],
  imports: [
    StandModule,
    AuthModule,
    BrowserModule,
    HttpClientModule,
    TransactionModule,
    PersonsModule,
    ProductModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    interceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
