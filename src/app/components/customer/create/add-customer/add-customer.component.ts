import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from 'src/app/services/notification/alerts.service';
import { CustomerServiceService } from '../../../../services/customer/customer-service.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customerProfileForm: FormGroup ;
  isUpdateCustomer: boolean = false;
  selectedFiles: FileList;
  progress: { percentage: number } = { percentage: 0 };
  currentFileUpload: File;
  customerId : number;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerServiceService,
    private alertsService: AlertsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customerProfileForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      middleName: new FormControl(),
      lastName: ['',Validators.required],
      dob: ['',Validators.required],
      ssn: ['',Validators.required],
      address1: new FormControl(),
      address2: new FormControl(),
      city: ['',Validators.required],
      country: ['',Validators.required],
      state: ['',Validators.required],
      zipPin: ['',Validators.required],
      zipExt:['',Validators.required],
      documentType: ['',Validators.required],
      fileName:['',Validators.required]
      


    });
   }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.customerId = params['customerId'];
      console.log("customer id: "+this.customerId);
      if (this.customerId) {
        this.isUpdateCustomer = true;
        this.customerService.getCustomer(this.customerId).subscribe(response => {
          this.customerProfileForm = this.formBuilder.group({
            customerId: this.customerId,
            firstName: [response.firstName ,Validators.required],
            middleName: response.middleName,
            lastName: [response.lastName,Validators.required],
            dob: [response.dob,Validators.required],
            ssn: [response.ssn,Validators.required],
            address1: response.address1,
            address2: response.address2,
            city: [response.city,Validators.required],
            country: [response.country,Validators.required],
            state: [response.state,Validators.required],
            zipPin: [response.zipPin,Validators.required],
            zipExt:[response.zipExt,Validators.required],
            documentType: [response.documentType],
            fileName:['']
          });
        }, (error) => {
          this.alertsService.showError("error::", error.error.message);
         
        });
      }
    });
  }


  onSubmit() {
    console.log(this.customerProfileForm);
    console.log(this.customerProfileForm.value);

    this.customerService.createCustomer(this.customerProfileForm.value).subscribe(response => {
      console.log(response);
      if(!this.customerId) {
        this.progress.percentage = 0;
        this.currentFileUpload = this.selectedFiles[0];
        this.customerService.uploadFile(this.currentFileUpload, response.customerId).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress.percentage = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            alert('File Successfully Uploaded');
          }
          // this.selectedFiles = undefined;
        }
        );
      }
      this.router.navigateByUrl('/home');
    }, (error) => {
      this.alertsService.showError("error::", error.error.message);

    });

  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
}

