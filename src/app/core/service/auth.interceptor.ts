import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = 'your-access-token';
    let data :any = localStorage.getItem('user');
    if(data){
        data = JSON.parse(data);
        accessToken = data.access_token
    }
   
    

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'Custom-Header': 'Value'
      }
    });

    return next.handle(request);
  }




  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   let accessToken = 'your-access-token';
  //   let data :any = localStorage.getItem('user');
  //   if(data){
  //       data = JSON.parse(data);
  //       accessToken = data.access_token
  //   }
  //   // Add headers to the request
  //   const authReq = request.clone({
  //     headers: request.headers.set('Authorization', accessToken)
  //   });

  //   return next.handle(authReq).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       let errorMessage = '';
  //       if (error.error instanceof ErrorEvent) {
  //         // client-side error
  //         errorMessage = `Error: ${error.error.message}`;
  //       } else {
  //         // server-side error
  //         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //       }
  //       // console.log(errorMessage);
  //       return throwError(errorMessage);
  //     })
  //   );
  // }



}



