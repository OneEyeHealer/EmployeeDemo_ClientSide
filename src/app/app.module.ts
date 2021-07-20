import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FormEmployeeComponent } from './employee/form-employee/form-employee.component';
import { InfoEmployeeComponent } from './employee/info-employee/info-employee.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormAddressComponent } from './employee/info-employee/form-address/form-address.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './footer/footer.component';
// import {Ng2OrderModule} from '';
// Ng2OrderModule,
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NavbarComponent,
    FormEmployeeComponent,
    InfoEmployeeComponent,
    FormAddressComponent,
    FooterComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    Ng2OrderModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
