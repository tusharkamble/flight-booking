import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AirlineService } from '../services/airline.service';

@Component({
  selector: 'app-flight-inventory',
  templateUrl: './flight-inventory.component.html',
  styleUrls: ['./flight-inventory.component.css']
})
export class FlightInventoryComponent implements OnInit {
  lstFlightInventory:any=[];
  @Output() activateOperationEvent=new EventEmitter<string>();
  constructor(private airlineService:AirlineService) { }

  ngOnInit(): void {
    this.fetchFlightInventory();
  }

  fetchFlightInventory() {
    return this.airlineService.getFlightInventory().subscribe((res: any) => {
      this.lstFlightInventory = res;
      console.log(this.lstFlightInventory);
    });
  }
  activateOperation(ActiveOperation:string){
    this.activateOperationEvent.emit(ActiveOperation);
  }
}
