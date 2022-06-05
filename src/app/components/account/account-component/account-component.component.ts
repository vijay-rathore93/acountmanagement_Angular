import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Account } from 'src/app/model/account';
import { Customer } from 'src/app/model/customer';
import { AccountServiceService } from 'src/app/services/account/account-service.service';
import { ConfirmDialogService } from '../../customer/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-account-component',
  templateUrl: './account-component.component.html',
  styleUrls: ['./account-component.component.css']
})
export class AccountComponentComponent implements OnInit {

  constructor(private accountServiceService: AccountServiceService,
    private router: Router,private modalService: NgbModal,private confirmationDialogService: ConfirmDialogService) { }
  
  accounts: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  account : Account=new Account();  
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
    this.accountServiceService.getAccountList().subscribe(data =>{  
    this.accounts =data;  
    this.dtTrigger.next();  
    })  
  }  
  
  Customersaveform=new FormGroup({  
    Customer_name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),  
    Customer_email:new FormControl('',[Validators.required,Validators.email]),  
    Customer_branch:new FormControl()  
  });  
  
 
  
  deleteCustomer(customerId:number) {
    let isSsnPopup = false;
    this.confirmationDialogService.confirm('Please confirm', 'Do you really want to delete ?', isSsnPopup).then((result: any) => {
      if (result) {
        this.accountServiceService.deleteAccount(customerId).subscribe(result => {
          window.location.reload();
        });
      }
    });
  }

  updateCustomer(customerId:number) {
    this.router.navigateByUrl('/addAccount?accountId='+customerId);
  } 

  getCustomer() {
  this.accountServiceService.getAccountList
  } 
  
  addCustomerForm(){  
    this.submitted=false;  
    this.Customersaveform.reset();  
  }  

  deactivateCustomer(customerId: any) {
    this.accountServiceService.deactivateAccount(customerId).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/account').then(() => {
        window.location.reload();
      });
    }, (error) => {
      console.log("error::", error.error.message);
    });;
  } 
  
  activateCustomer(customerId:any) {
    this.accountServiceService.activateAccount(customerId).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/account').then(() => {
        window.location.reload();
      });
    }, (error) => {
      console.log("error::", error.error.message);
    });;
  } 
  
  closeModal: string | undefined;
  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
