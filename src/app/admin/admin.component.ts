import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ActiveTab:string="Manage Airline";
  ActiveOperation:string="None";
  
  constructor() {
   }

  ngOnInit(): void {
    
  }
  
  setActiveTab(tabName:string){
    this.ActiveTab=tabName;
    this.ActiveOperation="None";
  }  
  activateOperation(eOpearation:string){
    this.ActiveOperation=eOpearation;
  }
}
