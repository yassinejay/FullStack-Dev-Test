import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import {
  NgbDateAdapter,
  NgbDateNativeUTCAdapter,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { CustomerComponent } from './customer/customer.component';
import { InstallationListComponent } from './installation/installation-list.component';
import { InstallationShowComponent } from './installation/installation-show.component';
import { InstallationNewComponent } from './installation/installation-new.component';
import { InstallationService } from './installation/installation.service';
import { installationInfoComponent } from './installation-info/installation-info.component';
import { customerInfoComponent } from './customer-info/customer-info.component';
import { companyInfoComponent } from './company-info/company-info.component'
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CustomerComponent,
    InstallationListComponent,
    InstallationShowComponent,
    InstallationNewComponent,
    installationInfoComponent,
    customerInfoComponent,
    companyInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter },
              { provide: InstallationService, useClass: InstallationService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
