import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AirlineService } from '../services/airline.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.css']
})
export class AirlineListComponent implements OnInit {
  lstAirline:any=[];
  @Output() activateOperationEvent=new EventEmitter<string>();
  constructor(private airlineService:AirlineService) { }

  ngOnInit(): void {
    this.fetchAirlines();
  }
  fetchAirlines() {
    return this.airlineService.getAirlines().subscribe((res: any) => {
      this.lstAirline = res;
      console.log(this.lstAirline);
    });
  }
  BlockOrUnblockAirline(airline:any){
    return this.airlineService.blockOrUnblockAirline(airline).subscribe((res: any) => {
      this.lstAirline = res;
      console.log(this.lstAirline);
    });
  }
  UnblockAirline(airlineId:number){
    let airline = this.lstAirline.filter((a:any)=>a.id===airlineId)[0];
    if(airline){
      airline.isBlocked=false;
      this.BlockOrUnblockAirline(airline);      
    }
  }
  BlockAirline(airlineId:number){
    let airline = this.lstAirline.filter((a:any)=>a.id===airlineId)[0];
    if(airline){
      airline.isBlocked=true;
      this.BlockOrUnblockAirline(airline);
    }
  }
  activateOperation(ActiveOperation:string){
    this.activateOperationEvent.emit(ActiveOperation);
  }
}