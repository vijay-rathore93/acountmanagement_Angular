import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponentComponent } from './components/account/account-component/account-component.component';
import { AddCustomerComponent } from './components/customer/create/add-customer/add-customer.component';
import { CustomerComponentComponent } from './components/customer/customer-component/customer-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TransactionComponentComponent } from './components/transaction/transaction-component/transaction-component.component';
import { ConfirmDialogComponent } from './components/customer/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './components/customer/confirm-dialog/confirm-dialog.service';
import { AddAccountComponent } from './components/account/add-account/add-account.component';
import { DepositComponent } from './components/transaction/deposit/deposit.component';
import { WithdrawalComponent } from './components/transaction/withdrawal/withdrawal.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponentComponent,
    AccountComponentComponent,
    TransactionComponentComponent,
    NavbarComponent,
    AddCustomerComponent,
    ConfirmDialogComponent,
    AddAccountComponent,
    DepositComponent,
    WithdrawalComponent

  ],
  imports: [  
    BrowserModule,  
    AppRoutingModule,  
    HttpClientModule,  
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,   
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],  
  providers: [ConfirmDialogService  ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmDialogComponent ],
})
export class AppModule { }
