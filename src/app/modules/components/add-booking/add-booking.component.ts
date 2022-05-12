import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline.service';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  TicketBookingStages:any={
    SelectFlight:1,
    ApplyDiscount:2,
    SaveTicket:3
  };
  ActiveTicketBookingStage=this.TicketBookingStages.SelectFlight;
  journeyTypes:any={
    OneWay:"One Way",TwoWay:"Two Way"
  };  
  lstLocations:string[]=[];
  lstMealTypes:string[]=["None","Veg","Nonveg"];
  
  today:any=(new Date()).toISOString().substring(0,16);
  userDetail:any=JSON.parse(localStorage.getItem("User")||"{}");

  lstDiscounts:any;
  filterData:any;
  selectionMealType:any={
    [this.journeyTypes.OneWay]:"",
    [this.journeyTypes.TwoWay]:""
  };
  selectionFlightIds:any={
    [this.journeyTypes.OneWay]:"",
    [this.journeyTypes.TwoWay]:""
  }
  selectionFlightInventories:any={
    [this.journeyTypes.OneWay]:{},
    [this.journeyTypes.TwoWay]:{}
  }

  totalTicketPrice:number=0;
  totalTicketPriceAfterDiscount:number=0;
  ticketsDataToSave:any;
  enteredTicketsData:any;

  constructor(private bookingService:BookingService,private airlineService:AirlineService) { 
    this.ticketsDataToSave=[];
    this.filterData={
      "journeyType":this.journeyTypes.OneWay,
      "fromLocation":"",
      "toLocation":"",
      // "startDate":this.today,
      // "endDate":this.today
      "startDate":null,
      "endDate":null
    };    
    this.updateValuesAsPerSelection();
    this.getAvailableLocations();
  }

  ngOnInit(): void {
    this.ticketsDataToSave=[];
  }
  resetSelection(){
    this.ActiveTicketBookingStage=this.TicketBookingStages.SelectFlight;
    this.selectionMealType={
      [this.journeyTypes.OneWay]:"",
      [this.journeyTypes.TwoWay]:""
    };
    this.selectionFlightIds={
      [this.journeyTypes.OneWay]:"",
      [this.journeyTypes.TwoWay]:""
    }
    this.selectionFlightInventories={
      [this.journeyTypes.OneWay]:{},
      [this.journeyTypes.TwoWay]:{}
    }
    this.ticketsDataToSave=[];
    this.filterData={
      "journeyType":this.journeyTypes.OneWay,
      "fromLocation":"",
      "toLocation":"",
      "startDate":null,
      "endDate":null
    };
    this.totalTicketPrice=0;
    this.totalTicketPriceAfterDiscount=0;
    this.updateValuesAsPerSelection();
  }
  getAvailableLocations() {
    return this.airlineService.getAvailableLocations().subscribe((res: any) => {
      this.lstLocations = res;
    });
  }
  getAvailableDiscounts() {
    return this.airlineService.getAvailableDiscounts().subscribe((res: any) => {
      this.lstDiscounts = res;
    });
  }

  updateValuesAsPerSelection(){
    this.enteredTicketsData={
      [this.journeyTypes.OneWay]:{
        "journeyType": this.filterData.journeyType,
        "flightIDs": this.selectionFlightIds[this.journeyTypes.OneWay],
        "userID": this.userDetail.emailId,
        "PNR": null,
        "isCancelled": false,
        "passengers": [
        ],
        "numberOfSeats": 1,
        "name": this.userDetail.username,
        "emailID": this.userDetail.emailId,
        "mealPreference": "Veg",
        "selectedSeats": "S1"
      },
      [this.journeyTypes.TwoWay]:{
        "journeyType": this.filterData.journeyType,
        "flightIDs": this.selectionFlightIds[this.journeyTypes.TwoWay],
        "userID": this.userDetail.emailId,
        "PNR": null,
        "isCancelled": false,
        "passengers": [      
        ],
        "numberOfSeats": 1,
        "name": this.userDetail.username,
        "emailID": this.userDetail.emailId,
        "mealPreference": "Veg",
        "selectedSeats": "S2"
      }
    };
  }

  continueBookingAsPerSelection(){
    if(this.filterData.journeyType===""){
      return;
    }    
    this.updateValuesAsPerSelection();
    this.ticketsDataToSave=[];
    if(this.filterData.journeyType===this.journeyTypes.OneWay){
      this.ticketsDataToSave.push(this.enteredTicketsData[this.journeyTypes.OneWay]);
    }else if(this.filterData.journeyType===this.journeyTypes.TwoWay){
      this.ticketsDataToSave.push(this.enteredTicketsData[this.journeyTypes.OneWay]);
      this.ticketsDataToSave.push(this.enteredTicketsData[this.journeyTypes.TwoWay]);
    }
    this.getAvailableDiscounts();
    this.ActiveTicketBookingStage=this.TicketBookingStages.ApplyDiscount;    
  }
  changeJourneyType(journeyType:string){
    this.filterData.journeyType=journeyType;
  }
  changeFromLocation(newLocation:string){
    this.filterData.fromLocation=newLocation;
  }
  changeToLocation(newLocation:string){
    this.filterData.toLocation=newLocation;
  }
  flightSelected(flightDetails:any,journeyType:string){
    console.log(flightDetails);
    if(this.journeyTypes.OneWay==journeyType){
      this.selectionFlightIds[this.journeyTypes.OneWay]=flightDetails.flightInventoryId;
      this.selectionFlightInventories[this.journeyTypes.OneWay]=flightDetails;
    }else if(this.journeyTypes.TwoWay==journeyType){
      this.selectionFlightIds[this.journeyTypes.TwoWay]=flightDetails.flightInventoryId;
      this.selectionFlightInventories[this.journeyTypes.TwoWay]=flightDetails;
    }else{return;}
    this.updateValuesAsPerSelection();
    this.UpdateTotalFair();
  }
  checkAndUpdatePassangerDetails(){
    this.ticketsDataToSave.forEach((journeyDetails:any) => {
      if(journeyDetails.passengers && journeyDetails.passengers.length===0){
        journeyDetails.passengers.push({
          "name":this.userDetail.username,
          "gender":this.userDetail.emailId,
          "age":this.userDetail.age
        });
      }
    });
  }
  bookTicketsAsPerSelection(){
    let flightInventoryIds="";
    if(this.ticketsDataToSave.length==2){      
      flightInventoryIds=this.selectionFlightIds[this.journeyTypes.OneWay]+""+this.selectionFlightIds[this.journeyTypes.TwoWay];
    }else if(this.ticketsDataToSave.length==1){
      flightInventoryIds=this.selectionFlightIds[this.journeyTypes.OneWay]+"";
    }else{return;} 
    this.checkAndUpdatePassangerDetails();   
    this.bookingService.bookTicketsAsPerJourney(this.ticketsDataToSave,flightInventoryIds)
    .subscribe((res: any) => {      
      if(res && res.message && res.pnr){
        alert(res.message+" Note down following PNR to check ticket details: "+res.pnr);
        window.location.reload();
        //this.resetSelection();
      }
    });
  }
  applyDiscount(discountId:any){
    let discountDetails = this.lstDiscounts
    .filter((d:any)=>d.id==discountId)[0];
    if(discountDetails){
      if(discountDetails.discountType.toUpperCase() =="PERCENT"){
        this.totalTicketPriceAfterDiscount = this.totalTicketPrice - (this.totalTicketPrice * (discountDetails.value/100));
      }else if(discountDetails.discountType.toUpperCase() =="VALUE"){
        let finalPrice = this.totalTicketPrice - discountDetails.value;
        this.totalTicketPriceAfterDiscount = finalPrice<0?0:finalPrice ;
      }
    }
  }
  UpdateTotalFair(){
    if(this.filterData.journeyType===this.journeyTypes.OneWay){
      this.totalTicketPrice = Number(this.selectionFlightInventories[this.journeyTypes.OneWay].ticketCost);
      this.totalTicketPriceAfterDiscount=this.totalTicketPrice;
    }else if(this.filterData.journeyType===this.journeyTypes.TwoWay){
      this.totalTicketPrice = Number(this.selectionFlightInventories[this.journeyTypes.OneWay].ticketCost)
      +Number(this.selectionFlightInventories[this.journeyTypes.TwoWay].ticketCost);
      this.totalTicketPriceAfterDiscount=this.totalTicketPrice;
    }else{this.totalTicketPrice =0;
      this.totalTicketPriceAfterDiscount=this.totalTicketPrice;
      return;
    }
  }
}