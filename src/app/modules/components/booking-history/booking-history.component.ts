import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  lstBookingHistory:any;
  userDetail:any=JSON.parse(localStorage.getItem("User")||"{}");

  constructor(private bookingService:BookingService) { }

  ngOnInit(): void {
    this.getBookingHistory();
  }

  getBookingHistory(){
    this.bookingService.getBookingHistory(this.userDetail.emailId)
    .subscribe((res: any) => {  
      this.lstBookingHistory=res;
    });
  }
}
