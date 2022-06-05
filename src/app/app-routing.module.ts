import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponentComponent } from './components/account/account-component/account-component.component';
import { AddAccountComponent } from './components/account/add-account/add-account.component';
import { AddCustomerComponent } from './components/customer/create/add-customer/add-customer.component';
import { CustomerComponentComponent } from './components/customer/customer-component/customer-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DepositComponent } from './components/transaction/deposit/deposit.component';
import { TransactionComponentComponent } from './components/transaction/transaction-component/transaction-component.component';
import { WithdrawalComponent } from './components/transaction/withdrawal/withdrawal.component';



const routes: Routes = [
  { path: 'home', component:  CustomerComponentComponent},
  { path: 'account', component: AccountComponentComponent },
  {path: 'addCustomer',component:AddCustomerComponent},
  {path: 'addAccount',component:AddAccountComponent},
  {path: 'transactions',component:TransactionComponentComponent},
  {path: 'deposit',component:DepositComponent},
  {path: 'withdrawal',component:WithdrawalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  


}
