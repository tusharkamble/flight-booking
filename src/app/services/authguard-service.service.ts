import { Injectable } from '@angular/core';

import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {
  epBaseURL = "http://localhost:9000/";
  endpoints = {
    gettoken:this.epBaseURL+'/api/Auth/GetToken'
  };
  httpHeader_Get = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      "Authorization":"Bearer "+localStorage.getItem("Token")||'no-token'
    }),
  };
  httpHeader_Post = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Authorization":"Bearer "+localStorage.getItem("Token")||'no-token'
    }),
  };
  constructor(private httpClient: HttpClient) { }
  logout():any{
    localStorage.clear();
  }
  gettoken():any {
    return localStorage.getItem("Token");
  }
  isUserLoggedIn():any{
    return !!localStorage.getItem("Token") && !!localStorage.getItem("User");
  }
  authenticateUser(user:any): Observable<any> {
    return this.httpClient
      .post<any>(this.endpoints.gettoken,JSON.stringify(user),this.httpHeader_Post)
      .pipe(retry(1), catchError(this.processError));
  }
  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }
}