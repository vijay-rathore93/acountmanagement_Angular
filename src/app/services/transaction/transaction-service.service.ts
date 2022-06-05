import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/model/Transaction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {

  constructor(private http:HttpClient) { }  
  
  getTransactions(): Observable<any> { 
    debugger; 
    return this.http.get(environment.basic_url+'transaction/all');  
  }  

  voidTransaction(id: number): Observable<any> {  
    return this.http.get(environment.basic_url+'transaction/void', this.getHeader(id));  
  }

  depositAmount(transaction: Transaction): Observable<any> {  
    const headerDict = {
      'Content-Type':'application/json'
    }

    const request = {
      'fromAccount':transaction.fromAccount,
      'amountTobeDeposit':transaction.totalAmount
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };  
    
    debugger;
    return this.http.post(environment.basic_url+'transaction/deposit', request, requestOptions);  
  }

  withDrawAmount(transaction: Transaction): Observable<any> {  
    const headerDict = {
      'Content-Type':'application/json'
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };  

    const request = {
      'fromAccount':transaction.fromAccount,
      'amountToBeWithDraw':transaction.totalAmount
    }
    
    return this.http.post(environment.basic_url+'transaction/withdraw', request, requestOptions);  
  }

  getHeader(id: number) {
    const headerDict = {
      'txId':`${id}`,
      'Content-Type': 'application/json'
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return requestOptions;
  }
  
}
