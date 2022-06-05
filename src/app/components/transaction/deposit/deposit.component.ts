import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServiceService } from 'src/app/services/account/account-service.service';
import { AlertsService } from 'src/app/services/notification/alerts.service';
import { TransactionServiceService } from 'src/app/services/transaction/transaction-service.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  accountProfileForm: FormGroup ;
  isUpdateCustomer: boolean = false;
  banks : any[] = [];  
  customerId: number;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountServiceService,
    private alertsService: AlertsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionServiceService
  ) {
    this.accountProfileForm = this.formBuilder.group({
      fromAccount: ['',Validators.required],
      bankName:['',Validators.required],
      ifscCode: ['', Validators.required],
      branchCode: ['', Validators.required],
      bankAddress: ['', Validators.required],
      totalAmount: ['',Validators.required]
    });
   }


  ngOnInit(): void {

    this.accountService.getAccountList().subscribe(data =>{  
      this.banks =data;  
     
      })  


      this.accountProfileForm.controls.bankName.disable();
    
      this.accountProfileForm.controls.ifscCode.disable();
      
      this.accountProfileForm.controls.branchCode.disable();
  
      this.accountProfileForm.controls.bankAddress.disable();


    this.activatedRoute.queryParams.subscribe(params => {
      const accountId = params['accountId'];
      const customerId = params['customerId'];
      console.log("account id: "+accountId);
      if (accountId) {
        this.isUpdateCustomer = true;
        this.accountService.getAccount(accountId).subscribe(response => {
          this.accountProfileForm = this.formBuilder.group({
            accountId: accountId,
            fromAccount: [response.accountNumber,Validators.required],
            bankName:[response.bankName,Validators.required],
            ifscCode: [response.ifscCode, Validators.required],
            branchCode: [response.branchCode, Validators.required],
            bankAddress: [response.bankAddress, Validators.required],
            totalAmount: [response.totalAmount,Validators.required]
          });
          this.customerId = response.customerId;
        }, (error) => {
          this.alertsService.showError("error::", error.error.message);
         
        });
      } else if(customerId) {
        this.customerId = customerId;
      }
    });
  }


  onSubmit() {
    this.transactionService.depositAmount(this.accountProfileForm.value).subscribe((response: any) => {
      console.log(response);
      this.router.navigateByUrl('/transactions');
      
    }, (error: { error: { message: any; }; }) => {
      this.alertsService.showError("error::", error.error.message);
     
    });
    
  }

  onChange(deviceValue: any) {

    this.accountProfileForm.controls.bankName.setValue(this.banks.filter(x => x.accountNumber==deviceValue)[0].bankName);
    this.accountProfileForm.value.bankName = this.banks.filter(x => x.accountNumber==deviceValue)[0].bankName;
    
      this.accountProfileForm.controls.ifscCode.setValue(this.banks.filter(x => x.accountNumber==deviceValue)[0].ifscCode);
      this.accountProfileForm.value.ifscCode = this.banks.filter(x => x.accountNumber==deviceValue)[0].ifscCode;
      
      this.accountProfileForm.controls.branchCode.setValue(this.banks.filter(x => x.accountNumber==deviceValue)[0].branchCode);
      this.accountProfileForm.value.branchCode = this.banks.filter(x => x.accountNumber==deviceValue)[0].branchCode;
  
      this.accountProfileForm.controls.bankAddress.setValue(this.banks.filter(x => x.accountNumber==deviceValue)[0].bankAddress);
      this.accountProfileForm.value.bankAddress = this.banks.filter(x => x.accountNumber==deviceValue)[0].bankAddress;
     
    

  
  }
}
