import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  epBaseURL = "http://localhost:9000/";
  endpoints = {
    getFilteredFlightInventory:this.epBaseURL+'api/v1.0/flight/GetFilteredFlightInventory',
    bookTicketsAsPerJourney:this.epBaseURL+'api/v1.0/flight/BookTicketsAsPerJourney/',
    getBookingHistory:this.epBaseURL+"api/v1.0/flight/booking/history/",
    cancelTheTicketByPNR:this.epBaseURL+"api/v1.0/flight/booking/cancel/"
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
  getBookingHistory(emailId:string){
    return this.httpClient
      .get<any>(this.endpoints.getBookingHistory+emailId,this.httpHeader_Get)
      .pipe(retry(1), catchError(this.processError));
  }
  cancelTheTicketByPNR(PNR:string){
    return this.httpClient
      .delete<any>(this.endpoints.cancelTheTicketByPNR+PNR,this.httpHeader_Get)
      .pipe(retry(1), catchError(this.processError));
  }
  bookTicketsAsPerJourney(payload:any,csvFlightInventoryIds:string): Observable<any> {
    return this.httpClient
      .post<any>(this.endpoints.bookTicketsAsPerJourney+csvFlightInventoryIds,
        JSON.stringify(payload),this.httpHeader_Post)
      .pipe(retry(1), catchError(this.processError));
  }
  getFilteredFlightInventory(payload:any): Observable<any> {
    return this.httpClient
      .post<any>(this.endpoints.getFilteredFlightInventory,JSON.stringify(payload),this.httpHeader_Post)
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