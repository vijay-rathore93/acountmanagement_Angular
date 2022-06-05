import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from "rxjs";
import { Customer } from 'src/app/model/customer';
import { CustomerServiceService } from '../../../services/customer/customer-service.service';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-customer-component',
  templateUrl: './customer-component.component.html',
  styleUrls: ['./customer-component.component.css']
})
export class CustomerComponentComponent implements OnInit {

  constructor(private customerServiceService: CustomerServiceService,
    private router: Router,private modalService: NgbModal,private confirmationDialogService: ConfirmDialogService) { }
  
  customers: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  customer : Customer=new Customer();  
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
    this.customerServiceService.getCustomerList().subscribe(data =>{  
    this.customers =data;  
    this.dtTrigger.next();  
    })  
  }  
  
  Customersaveform=new FormGroup({  
    Customer_name:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),  
    Customer_email:new FormControl('',[Validators.required,Validators.email]),  
    Customer_branch:new FormControl()  
  });  
  
  saveCustomer(){  
    
    this.submitted = true;  
    this.save();  
  }  
  
    
  
  save() {  
    this.customerServiceService.createCustomer(this.customer)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.customer = new Customer();  
  }  
  
  deleteCustomer(customerId:number) {
    let isSsnPopup = false;
    this.confirmationDialogService.confirm('Please confirm', 'Do you really want to delete ?', isSsnPopup).then(result => {
      if (result) {
        this.customerServiceService.deleteCustomer(customerId).subscribe(result => {
          window.location.reload();
        });
      }
    });
  }

  showSSNModal(customer: Customer , ssn:String){
    let isSsnPopup = true;
    this.confirmationDialogService.confirm('Please Enter Password', '', isSsnPopup).then(result => {
      if (result) {
        customer.isAuthenticated = true;
      }
    });
  }

  updateCustomer(customerId:number) {
    this.router.navigateByUrl('/addCustomer?customerId='+customerId);
  }
  
  createAccount(customerId:number) {
    this.router.navigateByUrl('/addAccount?customerId='+customerId);
  }

  getCustomer() {
  this.customerServiceService.getCustomerList
  } 
  
  addCustomerForm(){  
    this.submitted=false;  
    this.Customersaveform.reset();  
  }  

  deactivateCustomer(customerId: any) {
    this.customerServiceService.deactivateCustomer(customerId).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/home').then(() => {
        window.location.reload();
      });
    }, (error) => {
      console.log("error::", error.error.message);
    });;
  } 
  
  activateCustomer(customerId:any) {
    this.customerServiceService.activateCustomer(customerId).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/home').then(() => {
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
