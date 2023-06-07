import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
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
      }),catchError(error => {
        return of(null); 
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
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  getUsersList() {
    return this.http.get<Boolean>(this.apiUrl + 'auth/users/list').pipe(
      map((list: any) => {
        return list;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  forgetPassword(data: string) {
    return this.http.post<Boolean>(this.apiUrl + 'auth/forgot-password', data).pipe(
      map((list: any) => {
        return list;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  changeUserRole(data: any) {
    return this.http.put<Boolean>(this.apiUrl + 'auth/user/update', data).pipe(
      map((list: any) => {
        return list;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  getUsersProfile() {
    return this.http.get<Boolean>(this.apiUrl + 'auth/users/profile').pipe(
      map((list: any) => {
        return list;
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  


  getuser(id: any) {
    return this.http.get<Boolean>(this.apiUrl + 'auth/user/' + id).pipe(
      map((list: any) => {
        return list;
      }),catchError(error => {
        return of(null); 
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
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  addAccount(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'account/add', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  addStrategies(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'strategies/add', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  getMyStrategies() {
    return this.http.get<boolean>(this.apiUrl + 'strategies/private-list').pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  getpublicStrategies() {
    return this.http.get<boolean>(this.apiUrl + 'strategies/public-list').pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  copyStrategy(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'copysubscription/add', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  // copytrading(data: any) {
  //   return this.http.post<boolean>(this.apiUrl + 'copysubscription/copytrading', data).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  copytrading(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'copysubscription/place', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  getCoinsList() {
    return this.http.get<boolean>(this.apiUrl + 'copysubscription/all-coins').pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  getSubscriptionList() {
    return this.http.get<boolean>(this.apiUrl + 'copysubscription/subscription').pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  getcurrentOrderList() {
    return this.http.get<boolean>(this.apiUrl + 'orders/current').pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  getpositionOrderList() {
    return this.http.get<boolean>(this.apiUrl + 'orders/position').pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  gethistoryOrderList() {
    return this.http.get<boolean>(this.apiUrl + 'orders/history').pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  cancelOrder(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'orders/cancel', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  /**Current order Edit profit / loss */
  editOrder(data : any){
    return this.http.put<boolean>(this.apiUrl + 'orders/edit', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  editpostionOrder(data : any){
    return this.http.put<boolean>(this.apiUrl + 'orders/position/edit', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  closePostionOrder(data : any){
    return this.http.put<boolean>(this.apiUrl + 'orders/position/close', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }




  /** Order Details For admin */
  // http://localhost:4000/api/v1/analytics/main-trade/646dc68d5d720339552b7b7b

  getMainTradersPostion(id : string) {
    return this.http.get<boolean>(this.apiUrl + 'analytics/main-trade/' + id).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  getMainTradersClose(id : string) {
    return this.http.get<boolean>(this.apiUrl + 'analytics/close-trade/' + id).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

  getSubscriberlist(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'analytics/subscriber', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }




  checkleverage(data: any) {
    return this.http.post<boolean>(this.apiUrl + 'copysubscription/leverage', data).pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }


  tradeWithdaw() {
    return this.http.get<boolean>(this.apiUrl + 'analytics/withdraw').pipe(
      map((res: any) => {
        return res;
      }),catchError(error => {
        return of(null); 
      })
    );
  }

}

















