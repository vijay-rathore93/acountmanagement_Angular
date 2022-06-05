import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/model/customer';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  
  
  constructor(private http:HttpClient) { }  
  
  getCustomerList(): Observable<any> {  
    return this.http.get(environment.basic_url+'customer/all');  
  }  
  
  uploadFile(file: File, id: number): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    const headerDict = {
      'customerId':`${id}`
    }
    const newRequest = new HttpRequest('POST', environment.basic_url+'customer/upload', data, {
    reportProgress: true,
    responseType: 'text',
    headers: new HttpHeaders(headerDict)
    });
    return this.http.request(newRequest);
  }

  createCustomer(customer: object) : Observable<any>{  
    return this.http.post(environment.basic_url+'customer/', customer);  
  }  
  
  deleteCustomer(id: number): Observable<any> {  
    return this.http.delete(environment.basic_url+'customer/', this.getHeader(id));  
  }  



  activateCustomer(id: any): Observable<any> { 
    return this.http.get(environment.basic_url+'customer/activate',this.getHeader(id));  
  } 

  deactivateCustomer(id: any): Observable<any> { 
    return this.http.get(environment.basic_url+'customer/deactivate',this.getHeader(id));  
  }

  getHeader(id: number) {
    const headerDict = {
      'customerId':`${id}`,
      'Content-Type': 'application/json'
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return requestOptions;
  }

  
  getCustomer(id: number): Observable<Customer> {  
    return this.http.get<Customer>(environment.basic_url+'customer/', this.getHeader(id));  
  } 
  
     
  
  

}
