import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  epBaseURL = "http://localhost:9000/";
  endpoints = {
    getAirlines:this.epBaseURL+'api/airline/GetAirlines',
    addAirline:this.epBaseURL+'api/v1.0/flight/airline/register',
    getFlightInventory:this.epBaseURL+'api/airline/GetFlightInventory',
    addSheduleIntoFlightInventory:this.epBaseURL+'api/v1.0/flight/airline/inventory/add',
    blockOrUnblockAirline:this.epBaseURL+"api/v1.0/flight/airline/BlockUnblockAirline",
    getAvailableDiscounts:this.epBaseURL+"api/v1.0/flight/GetDiscounts",
    getAvailableLocations:this.epBaseURL+"api/airline/GetAvailableLocations",
    getDiscounts:this.epBaseURL+"api/v1.0/flight/GetDiscounts",
    addDiscount:this.epBaseURL+"api/v1.0/flight/AddDiscount"
  };
  constructor(private httpClient: HttpClient) { }
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
  blockOrUnblockAirline(airline:any): Observable<any> {
    return this.httpClient
      .post<any>(this.endpoints.blockOrUnblockAirline,JSON.stringify(airline),this.httpHeader_Post)
      .pipe(retry(1), catchError(this.processError));
  }
  getAirlines(): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoints.getAirlines,this.httpHeader_Get)
      .pipe(retry(1), catchError(this.processError));
  }
  getDiscounts(): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoints.getDiscounts,this.httpHeader_Get)
      .pipe(retry(1), catchError(this.processError));
  }
  getAvailableLocations(): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoints.getAvailableLocations,this.httpHeader_Get)
      .pipe(retry(1), catchError(this.processError));
  }
  getAvailableDiscounts(): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoints.getAvailableDiscounts,this.httpHeader_Get)
      .pipe(retry(1), catchError(this.processError));
  }
  addAirline(payload:any): Observable<any> {
    return this.httpClient
      .post<any>(this.endpoints.addAirline,JSON.stringify(payload),this.httpHeader_Post)
      .pipe(retry(1), catchError(this.processError));
  }
  addDiscount(payload:any): Observable<any> {
    return this.httpClient
      .post<any>(this.endpoints.addDiscount,JSON.stringify(payload),this.httpHeader_Post)
      .pipe(retry(1), catchError(this.processError));
  }
  addSheduleIntoFlightInventory(payload:any): Observable<any> {
    return this.httpClient
      .post<any>(this.endpoints.addSheduleIntoFlightInventory,JSON.stringify(payload),this.httpHeader_Post)
      .pipe(retry(1), catchError(this.processError));
  }

  getFlightInventory(): Observable<any> {
    return this.httpClient
      .get<any>(this.endpoints.getFlightInventory,this.httpHeader_Get)
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
