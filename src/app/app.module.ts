import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*Angular material*/
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/*Angular routing*/
import { AppRoutingModule } from './app-routing.module';

/*Angular interceptor*/
import { JwtInterceptor, ErrorInterceptor } from './interceptors';

/*Angular component*/
import { AppComponent } from './components/app/app.component';
import { AlertComponent } from './components/alert/alert.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { CommitsComponent } from './components/commits/commits.component';


/*Angular local ES*/
import { LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { SearchcommitsComponent } from './components/searchcommits/searchcommits.component';
import { FilterPipe } from './pipes/filter.pipe';



registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    AdminComponent,
    LoginComponent,
    MetricsComponent,
    CommitsComponent,
    SearchcommitsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' }],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
