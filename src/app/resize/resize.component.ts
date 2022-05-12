import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css']
})
export class ResizeComponent implements OnInit {

  @Input() fontSize! : number;
  @Input() callBackChangeFontSize!:any;
  @Output() changeSize = new EventEmitter<number>(); 

  constructor() {
  }

  ngOnInit(): void {
  }

  changeFontSizeForCallBack(step:number){
    this.callBackChangeFontSize( step);
  }

  incrementSize(){
    this.changeSize.emit(this.fontSize+1);
  }
  decrementSize(){
    this.changeSize.emit(this.fontSize-1);
  }

}
