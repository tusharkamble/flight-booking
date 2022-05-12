import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IFlightInventory } from '../Interfaces/IFlightInventory';
import { AirlineService } from '../services/airline.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  lstAirline:any;
  lstMealType:string[];
  objFlightInventory:IFlightInventory={
    flightInventoryId :0,
    flightNumber :0,
    airlineID :0,
    fromPlace :"",
    toPlace :"",
    startDateTime :null,
    endDateTime :null,
    scheduleDays :"",
    instrumentUsed :"",
    bussinesSteatsCount :0,
    nonBussinesSeatCount :0,
    ticketCost :0,
    noofRows :0,
    mealType :""
  };
  @Output() activateOperationEvent=new EventEmitter<string>();
  constructor(private airlineService:AirlineService) { 
    this.lstMealType=['None','Veg','Nonveg','Both']
  }

  ngOnInit(): void {
    this.fetchAirlines();
  }

  fetchAirlines() {
    return this.airlineService.getAirlines().subscribe((res: any) => {
      this.lstAirline = res;
    });
  }
  addSheduleIntoFlightInventory(){        
    this.airlineService.addSheduleIntoFlightInventory(this.objFlightInventory)
    .subscribe((res: any) => {
      this.activateOperation("None");
    });
  }
  activateOperation(ActiveOperation:string){
    this.activateOperationEvent.emit(ActiveOperation);    
  }
  goBackToMain(){
    this.activateOperationEvent.emit('None');
  }
}
