import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  objAirline:any={
    Name:'',
    ContactNumber:'',
    Address:''
  };
  @Output() activateOperationEvent=new EventEmitter<string>();
  constructor(private airlineService:AirlineService) { }

  ngOnInit(): void {
  }  
  addAirline(){    
    this.airlineService.addAirline(this.objAirline).subscribe((res: any) => {
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
