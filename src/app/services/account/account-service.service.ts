import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/model/account';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  
  
  constructor(private http:HttpClient) { }  
  
  getAccountList(): Observable<any> {  
    return this.http.get(environment.basic_url+'account/all');  
  }  
  
  createAccount(account: object, customerId: number) : Observable<any>{
    const headerDict = {
      'customerId':`${customerId}`,
      'Content-Type':'application/json'
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };  
    return this.http.post(environment.basic_url+'account/', account, requestOptions);  
  }  
  
  deleteAccount(id: number): Observable<any> {  
    return this.http.delete(environment.basic_url+'account/', this.getHeader(id));  
  }  



  activateAccount(id: any): Observable<any> { 
    const headerDict = {
      'accountNumber':`${id}`
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(environment.basic_url+'account/activate',requestOptions);  
  } 

  deactivateAccount(id: any): Observable<any> { 
    const headerDict = {
      'accountNumber':`${id}`
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(environment.basic_url+'account/deactivate',requestOptions);  
  }

  getHeader(id: number) {
    const headerDict = {
      'accountId':`${id}`
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return requestOptions;
  }

  
  getAccount(id: number): Observable<Account> {  
    return this.http.get<Account>(environment.basic_url+'account/', this.getHeader(id));  
  } 

  getAccountNumber(id: number): Observable<Account> {  
    return this.http.get<Account>(environment.basic_url+'account/accountNumber', this.getHeader(id));  
  } 
}
