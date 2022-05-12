import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-select-flight-list',
  templateUrl: './select-flight-list.component.html',
  styleUrls: ['./select-flight-list.component.css']
})
export class SelectFlightListComponent implements OnInit {
  @Input() fromLocation:string="";
  @Input() toLocation:string="";
  @Input() startDate:string="";
  @Input() endDate:string="";

  @Output() flightSelected=new EventEmitter<Object>();
  
  filterFlightInventory:any;
  lstFlightInventory:any;
  
  selectedFlightInventoryId:number=0;
  constructor(private bookingService:BookingService) { }

  ngOnInit(): void {
    this.filterFlightInventory={
      FromPlace:"",
      ToPlace:"",
      OnwardJourneyDate:"",
      ReturnJourneyDate:"",
      MealType:""
    };    
    //this.getFilteredFlightInventory_OnInit();
    this.getFilteredFlightInventoryAsPerFilter();
  }
  ngOnChanges(changes:SimpleChange){
    this.getFilteredFlightInventoryAsPerFilter()
  }

  getFilteredFlightInventory_OnInit(){
    this.bookingService.getFilteredFlightInventory(this.filterFlightInventory)
    .subscribe((res: any) => {
      this.lstFlightInventory = res;
    });
  }
  getFilteredFlightInventoryAsPerFilter(){
    this.filterFlightInventory={
      FromPlace:this.fromLocation,
      ToPlace:this.toLocation,
      OnwardJourneyDate:this.startDate,
      ReturnJourneyDate:this.endDate,
      MealType:""
    };
    this.bookingService.getFilteredFlightInventory(this.filterFlightInventory)
    .subscribe((res: any) => {
      this.lstFlightInventory = res;
    });
  } 


  selectFlight(flightInventoryId:number){
    this.selectedFlightInventoryId=flightInventoryId;
    this.flightSelected.emit(
      this.lstFlightInventory
      .filter((f:any)=>f.flightInventoryId==flightInventoryId)[0]
    );
  }
}
