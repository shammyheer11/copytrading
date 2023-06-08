import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BybitService } from './bybit.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private ApiService: BybitService,
    private route : Router

  ) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = 'your-access-token';
    let data: any = localStorage.getItem('user');
    if (data) {
      data = JSON.parse(data);
      accessToken = data.access_token
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'Custom-Header': 'Value'
      }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if(error.error && error.error.error && error.error.error.message && error.error.error.message == 'jwt expired'){
          this.ApiService.warningSnackBar('jwt token expired. Please login again');
          localStorage.clear();
          this.route.navigate(['login']);
        }
        
        else if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
          this.ApiService.warningSnackBar(`Error Code: ${error.status}\nMessage: ${error.message}`);
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          this.ApiService.warningSnackBar(`Error Code: ${error.status}\nMessage: Server Error`);
          // localStorage.clear();
          // this.route.navigate(['login']);
        }
        return throwError(errorMessage);
      })
    );
  }


}



