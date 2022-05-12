import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
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
  cancelTheTicketByPNR(PNR:string){
    this.bookingService.cancelTheTicketByPNR(PNR)
    .subscribe((res: any) => {
      alert("Ticket cancelled successfully.");
      location.reload();
    });
  }

}
