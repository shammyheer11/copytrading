import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class BybitService {
  public apiUrl: string;
  public successItems: any = {
    duration: 3000,
    verticalPosition: 'top',
    panelClass: ['tfcsucess']
  }
  public failedItems: any = {
    duration: 3000,
    verticalPosition: 'top',
    panelClass: ['tfcwarning']
  }


  constructor(
    private http: HttpClient, private _snackBar: MatSnackBar) {
    this.apiUrl = environment.APIURL;

  }



  private checkexchange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private checkOrderAlert: BehaviorSubject<string> = new BehaviorSubject<string>('');


  setalert(value: any) {
    this.checkexchange.next(value);
  }

  getalert() {
    return this.checkexchange.asObservable();
  }

  onPlaceOrder(value: any){
    this.checkOrderAlert.next(value);
  }

  getOrderAlert() {
    return this.checkOrderAlert.asObservable();
  }



  successSnackBar(data: string) {
    this._snackBar.open(data, 'Close', this.successItems);
  }

  warningSnackBar(data: string) {
    this._snackBar.open(data, 'Close', this.failedItems);
  }


  /**
   * User Login
   * @param data 
   * @returns 
   */
  userLogin(data: any) {
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
  userSignUp(data: any) {
    return this.http.post<Boolean>(this.apiUrl + 'auth/signup', data).pipe(
      map((list: any) => {
        return list;
      })
    );
  }


  getUsersList() {
    return this.http.get<Boolean>(this.apiUrl + 'auth/users/list').pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  forgetPassword(data: string) {
    return this.http.post<Boolean>(this.apiUrl + 'auth/forgot-password', data).pipe(
      map((list: any) => {
        return list;
      })
    );
  }

  changeUserRole(data: any) {
    return this.http.put<Boolean>(this.apiUrl + 'auth/user/update', data).pipe(
      map((list: any) => {
        return list;
      })
    );
  }


  getuser(id: any) {
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
  getAccountDetails() {
    return this.http.get<boolean>(this.apiUrl + 'account/apidata').pipe(
      map((list: any) => {
        return list;
      })
    );
  }


  addAccount(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'account/add', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  addStrategies(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'strategies/add', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getMyStrategies() {
    return this.http.get<boolean>(this.apiUrl + 'strategies/private-list').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getpublicStrategies() {
    return this.http.get<boolean>(this.apiUrl + 'strategies/public-list').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  copyStrategy(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'copysubscription/add', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  copytrading(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'copysubscription/copytrading', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getCoinsList() {
    return this.http.get<boolean>(this.apiUrl + 'copysubscription/all-coins').pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getSubscriptionList() {
    return this.http.get<boolean>(this.apiUrl + 'copysubscription/subscription').pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getcurrentOrderList() {
    return this.http.get<boolean>(this.apiUrl + 'orders/current').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getpositionOrderList() {
    return this.http.get<boolean>(this.apiUrl + 'orders/position').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  gethistoryOrderList() {
    return this.http.get<boolean>(this.apiUrl + 'orders/history').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  cancelOrder(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'orders/cancel', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /**Current order Edit profit / loss */
  editOrder(data : any){
    return this.http.put<boolean>(this.apiUrl + 'orders/edit', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  editpostionOrder(data : any){
    return this.http.put<boolean>(this.apiUrl + 'orders/position/edit', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  closePostionOrder(data : any){
    return this.http.put<boolean>(this.apiUrl + 'orders/position/close', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }




  /** Order Details For admin */
  // http://localhost:4000/api/v1/analytics/main-trade/646dc68d5d720339552b7b7b

  getMainTradersPostion(id : string) {
    return this.http.get<boolean>(this.apiUrl + 'analytics/main-trade/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getMainTradersClose(id : string) {
    return this.http.get<boolean>(this.apiUrl + 'analytics/close-trade/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getSubscriberlist(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'analytics/subscriber', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  
 

}

















