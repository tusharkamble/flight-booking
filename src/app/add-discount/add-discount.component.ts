import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AirlineService } from '../services/airline.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  lstDiscountType:any=["PERCENT","VALUE"];
  objDiscount:any={
    couponCode:'',
    value:0,
    discountType:this.lstDiscountType[0]
  };
  @Output() activateOperationEvent=new EventEmitter<string>();
  constructor(private airlineService:AirlineService) { }

  ngOnInit(): void {
  }  
  addDiscount(){
    this.airlineService.addDiscount(this.objDiscount).subscribe((res: any) => {
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
