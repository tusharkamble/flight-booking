import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AirlineService } from '../services/airline.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent implements OnInit {

  lstDiscounts:any=[];
  @Output() activateOperationEvent=new EventEmitter<string>();
  constructor(private airlineService:AirlineService) { }

  ngOnInit(): void {
    this.fetchDiscounts();
  }
  fetchDiscounts() {
    return this.airlineService.getDiscounts().subscribe((res: any) => {
      this.lstDiscounts = res;
      console.log(this.lstDiscounts);
    });
  }
  activateOperation(ActiveOperation:string){
    this.activateOperationEvent.emit(ActiveOperation);
  }

}
