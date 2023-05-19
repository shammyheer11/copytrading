import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class BybitService {
  public apiUrl : string ;
  public successItems : any = {
    duration: 3000,
    verticalPosition: 'top',
    // horizontalPosition: 'right',
    panelClass: ['tfcsucess']
 }
  public failedItems : any = {
    duration: 3000,
    verticalPosition: 'top',
    // horizontalPosition: 'right',
    panelClass: ['tfcwarning']
  }
  

  constructor(
    private http: HttpClient, private _snackBar : MatSnackBar) {
      this.apiUrl = environment.APIURL;

     }



     private checkexchange: BehaviorSubject<string> = new BehaviorSubject<string>('');


    setalert(value: any) {
      this.checkexchange.next(value);
    }
  
    getalert() {
      return this.checkexchange.asObservable();
    }



    successSnackBar(data : string) {
      this._snackBar.open(data, 'Close', this.successItems);
    }

    warningSnackBar(data : string) {
      this._snackBar.open(data, 'Close', this.failedItems);
    }


    /**
     * User Login
     * @param data 
     * @returns 
     */
    userLogin(data : any){
      return this.http.post<Boolean>(this.apiUrl + 'auth/login', data).pipe(
        map((list: any) => {
            return list;
        })
    );
    }
  
    /**
     * User Signup
     * @param data 
     * @returns 
     */
    userSignUp(data : any){
      return this.http.post<Boolean>(this.apiUrl + 'auth/signup', data).pipe(
        map((list: any) => {
            return list;
        })
    );
    }


    getUsersList(){
      return this.http.get<Boolean>(this.apiUrl + 'auth/users/list').pipe(
        map((list: any) => {
            return list;
        })
    );
    }

    forgetPassword(data : string){
      return this.http.post<Boolean>(this.apiUrl + 'auth/forgot-password', data).pipe(
        map((list: any) => {
            return list;
        })
    );
    }

    changeUserRole(data : any){
      return this.http.put<Boolean>(this.apiUrl + 'auth/user/update', data).pipe(
        map((list: any) => {
            return list;
        })
    );
    }


    getuser(id : any){
      return this.http.get<Boolean>(this.apiUrl + 'auth/user/' + id).pipe(
        map((list: any) => {
            return list;
        })
    );
    }



/****Bybit Api */

    /**
     * Get Account lists
     * @returns 
     */
    getAccountDetails(){
      return this.http.get<boolean>(this.apiUrl + 'account/apidata').pipe(
        map((list: any) => {
          return list;
        })
      );
    }


    addAccount(data : any){
      return this.http.post<boolean>(this.apiUrl + 'account/add', data).pipe(
        map((res : any) =>{
          return res;
        })
      );
    }


    addStrategies(data: any){
      return this.http.post<boolean>(this.apiUrl + 'strategies/add', data).pipe(
        map((res : any) =>{
          return res;
        })
      );
    }

    getMyStrategies(){
      return this.http.get<boolean>(this.apiUrl + 'strategies/private-list').pipe(
        map((res : any) =>{
          return res;
        })
      );
    }

    getpublicStrategies(){
      return this.http.get<boolean>(this.apiUrl + 'strategies/public-list').pipe(
        map((res : any) =>{
          return res;
        })
      );
    }

    copyStrategy(data : any){
      return this.http.post<boolean>(this.apiUrl + 'copysubscription/add', data).pipe(
        map((res : any) =>{
          return res;
        })
      );
    }


    copytrading(data : any){
      return this.http.post<boolean>(this.apiUrl + 'copysubscription/copytrading', data).pipe(
        map((res : any) =>{
          return res;
        })
      );
    }


    getCoinsList(){
      return this.http.get<boolean>(this.apiUrl + 'copysubscription/all-coins').pipe(
        map((res : any)=>{
          return res;
        })
      );
    }


    getSubscriptionList(){
      return this.http.get<boolean>(this.apiUrl + 'copysubscription/subscription').pipe(
        map((res : any)=>{
          return res;
        })
      );
    }


    getOrderList(){
      return this.http.get<boolean>(this.apiUrl + 'orders/list').pipe(
        map((res : any)=>{
          return res;
        })
      );
    }


}
















