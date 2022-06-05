import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Account } from 'src/app/model/account';
import { Transaction } from 'src/app/model/Transaction';
import { AccountServiceService } from 'src/app/services/account/account-service.service';
import { CustomerServiceService } from 'src/app/services/customer/customer-service.service';
import { TransactionServiceService } from 'src/app/services/transaction/transaction-service.service';
import { ConfirmDialogService } from '../../customer/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-transaction-component',
  templateUrl: './transaction-component.component.html',
  styleUrls: ['./transaction-component.component.css']
})
export class TransactionComponentComponent implements OnInit {

  constructor(private transactionServiceService: TransactionServiceService,
    private router: Router,private modalService: NgbModal,private confirmationDialogService: ConfirmDialogService) { }
  
    transactions: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  //transactions : Transaction=new Transaction();  
  submitted = false; 
  
  ngOnInit() {  
    this.submitted = false; 
   // this.isupdated=false;  
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };     
    this.transactionServiceService.getTransactions().subscribe(data =>{  
    this.transactions =data;  
    this.dtTrigger.next();  
    })  
  }  
  

 
  
  voidTransaction(txId:number) {
    let isSsnPopup = false;
    this.confirmationDialogService.confirm('Please confirm', 'Do you really want to cancel transaction ?', isSsnPopup).then((result: any) => {
      if (result) {
        this.transactionServiceService.voidTransaction(txId).subscribe(result => {
          window.location.reload();
        });
      }
    });
  }




  

  

}
