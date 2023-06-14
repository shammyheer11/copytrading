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

  onPlaceOrder(value: any) {
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
      }), catchError(error => {
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
      }), catchError(error => {
        return of(null);
      })
    );
  }



  /**
 * Get users list
 * @returns 
 */
  deleteUser(id: any) {
    return this.http.delete<Boolean>(this.apiUrl + 'auth/user/delete/' + id).pipe(
      map((list: any) => {
        return list;
      }), catchError(error => {
        return of(null);
      })
    );
  }  


/**
* Get users list
* @returns 
*/
editUserAccount(id: any) {
  return this.http.put<Boolean>(this.apiUrl + 'auth/user/updatedata', id).pipe(
    map((list: any) => {
      return list;
    }), catchError(error => {
      return of(null);
    })
  );
}



/**
 * Get users list
 * @returns 
 */
getUsersList() {
  return this.http.get<Boolean>(this.apiUrl + 'auth/users/list').pipe(
    map((list: any) => {
      return list;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * User forget password
 * @param data 
 * @returns 
 */
forgetPassword(data: string) {
  return this.http.post<Boolean>(this.apiUrl + 'auth/forgot-password', data).pipe(
    map((list: any) => {
      return list;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Switch user role
 * @param data 
 * @returns 
 */
changeUserRole(data: any) {
  return this.http.put<Boolean>(this.apiUrl + 'auth/user/update', data).pipe(
    map((list: any) => {
      return list;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * get user profile details
 * @returns 
 */
getUsersProfile() {
  return this.http.get<Boolean>(this.apiUrl + 'auth/users/profile').pipe(
    map((list: any) => {
      return list;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Get user details by ID
 * @param id 
 * @returns 
 */
getuser(id: any) {
  return this.http.get<Boolean>(this.apiUrl + 'auth/user/' + id).pipe(
    map((list: any) => {
      return list;
    }), catchError(error => {
      return of(null);
    })
  );
}



/****Bybit Api */

/**
 * Get exchange Account lists
 * @returns 
 */
getAccountDetails() {
  return this.http.get<boolean>(this.apiUrl + 'account/apidata').pipe(
    map((list: any) => {
      return list;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Add exchange account
 * @param data 
 * @returns 
 */
addAccount(data: any) {
  return this.http.post<boolean>(this.apiUrl + 'account/add', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Add exchange account
 * @param data 
 * @returns 
 */
editAccount(data: any) {
  return this.http.put<boolean>(this.apiUrl + 'account/edit', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}



/**
 * Add strategies
 * @param data 
 * @returns 
 */
addStrategies(data: any) {
  return this.http.post<boolean>(this.apiUrl + 'strategies/add', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Get My strategies
 * @returns 
 */
getMyStrategies() {
  return this.http.get<boolean>(this.apiUrl + 'strategies/private-list').pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Get public strategies
 * @returns 
 */
getpublicStrategies() {
  return this.http.get<boolean>(this.apiUrl + 'strategies/public-list').pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Copy public Strategy
 * @param data 
 * @returns 
 */
copyStrategy(data: any) {
  return this.http.post<boolean>(this.apiUrl + 'copysubscription/add', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Place order
 * @param data 
 * @returns 
 */
copytrading(data: any) {
  return this.http.post<boolean>(this.apiUrl + 'copysubscription/place', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Get coins list
 * @returns 
 */
getCoinsList() {
  return this.http.get<boolean>(this.apiUrl + 'copysubscription/all-coins').pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Get subscriptions list
 * @returns 
 */
getSubscriptionList() {
  return this.http.get<boolean>(this.apiUrl + 'copysubscription/subscription').pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Get current Orders list
 * @returns 
 */
getcurrentOrderList() {
  return this.http.get<boolean>(this.apiUrl + 'orders/current').pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Get positions order list
 * @returns 
 */
getpositionOrderList() {
  return this.http.get<boolean>(this.apiUrl + 'orders/position').pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Get history orders list
 * @returns 
 */
gethistoryOrderList() {
  return this.http.get<boolean>(this.apiUrl + 'orders/history').pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Cancel current order
 * @param data 
 * @returns 
 */

cancelOrder(data: any) {
  return this.http.post<boolean>(this.apiUrl + 'orders/cancel', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Current order Edit profit / loss
 * @param data 
 * @returns 
 */
editOrder(data: any) {
  return this.http.put<boolean>(this.apiUrl + 'orders/edit', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Edit postions order
 * @param data 
 * @returns 
 */
editpostionOrder(data: any) {
  return this.http.put<boolean>(this.apiUrl + 'orders/position/edit', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * Close positions order
 * @param data 
 * @returns 
 */
closePostionOrder(data: any) {
  return this.http.put<boolean>(this.apiUrl + 'orders/position/close', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Get positions orders
 * @param id 
 * @returns 
 */
getMainTradersPostion(id: string) {
  return this.http.get<boolean>(this.apiUrl + 'analytics/main-trade/' + id).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}

/**
 * get closed trade by id
 * @param id 
 * @returns 
 */
getMainTradersClose(id: string) {
  return this.http.get<boolean>(this.apiUrl + 'analytics/close-trade/' + id).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Get subscribers list
 * @param data 
 * @returns 
 */
getSubscriberlist(data: any) {
  return this.http.post<boolean>(this.apiUrl + 'analytics/subscriber', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Check coin price and wallets
 * @param data 
 * @returns 
 */
checkleverage(data: any) {
  return this.http.post<boolean>(this.apiUrl + 'copysubscription/leverage', data).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Withdraw cost
 * @returns 
 */
tradeWithdaw() {
  return this.http.get<boolean>(this.apiUrl + 'analytics/withdraw').pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


/**
 * Delete strategy
 * @param item 
 * @returns 
 */
deleteStrategy(item : any){
  return this.http.delete<boolean>(this.apiUrl + 'strategies/delete/' + item).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}


deleteExchangeAccount(item : any){
  return this.http.delete<boolean>(this.apiUrl + 'account/delete/' + item).pipe(
    map((res: any) => {
      return res;
    }), catchError(error => {
      return of(null);
    })
  );
}

}

















