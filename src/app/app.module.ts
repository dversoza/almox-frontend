import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandModule } from './stand';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PersonsModule } from './person';
import { HomepageComponent } from './homepage/homepage.component';
import { MeasurementUnitModule } from './measurement-unit';
import { ProductModule } from './product/products.module';
import { TransactionModule } from './transaction';
import { UserModule } from './user/user.module';
import { registerLocaleData } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomepageComponent,
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    StandModule,
    BrowserModule,
    HttpClientModule,
    TransactionModule,
    PersonsModule,
    ProductModule,
    MeasurementUnitModule,
    UserModule,
    SharedModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
