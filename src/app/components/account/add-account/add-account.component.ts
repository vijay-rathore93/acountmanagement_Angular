import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServiceService } from 'src/app/services/account/account-service.service';
import { AlertsService } from 'src/app/services/notification/alerts.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  accountProfileForm: FormGroup ;
  isUpdateCustomer: boolean = false;
  banks = [{
    name: 'HDFC', ifscCode: 'HDFCIFSC', branchCode: '001', bankAddress: 'Hdfc Address'
  },
  {
    name: 'AXIS', ifscCode: 'AXISIFSC', branchCode: '002', bankAddress: 'Axis Address'
  },
  {
    name: 'SBI',  ifscCode: 'SBIIFSC', branchCode: '003', bankAddress: 'Sbi Address'
  },
  ];
  customerId: number;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountServiceService,
    private alertsService: AlertsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.accountProfileForm = this.formBuilder.group({
      accountNumber: ['',Validators.required],
      bankName:['',Validators.required],
      ifscCode: ['', Validators.required],
      branchCode: ['', Validators.required],
      bankAddress: ['', Validators.required],
      totalAmount: ['',Validators.required]
    });
   }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const accountId = params['accountId'];
      const customerId = params['customerId'];
      console.log("account id: "+accountId);
      if (accountId) {
        this.isUpdateCustomer = true;
        this.accountService.getAccount(accountId).subscribe(response => {
          this.accountProfileForm = this.formBuilder.group({
            accountId: accountId,
            accountNumber: [response.accountNumber,Validators.required],
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
    this.accountService.createAccount(this.accountProfileForm.value, this.customerId).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/account');
      
    }, (error) => {
      this.alertsService.showError("error::", error.error.message);
     
    });
    
  }

  onChange(deviceValue: any) {
    this.accountProfileForm.controls.ifscCode.setValue(this.banks.filter(x => x.name==deviceValue)[0].ifscCode);
    this.accountProfileForm.value.ifscCode = this.banks.filter(x => x.name==deviceValue)[0].ifscCode;
    
    this.accountProfileForm.controls.branchCode.setValue(this.banks.filter(x => x.name==deviceValue)[0].branchCode);
    this.accountProfileForm.value.branchCode = this.banks.filter(x => x.name==deviceValue)[0].branchCode;

    this.accountProfileForm.controls.bankAddress.setValue(this.banks.filter(x => x.name==deviceValue)[0].bankAddress);
    this.accountProfileForm.value.bankAddress = this.banks.filter(x => x.name==deviceValue)[0].bankAddress;
  }

}
