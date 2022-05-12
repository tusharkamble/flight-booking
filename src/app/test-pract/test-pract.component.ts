import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-pract',
  templateUrl: './test-pract.component.html',
  styleUrls: ['./test-pract.component.css']
})
export class TestPractComponent implements OnInit {
  loginUserRole:string;
  todayDate:Date;
  fontSize:number;
  constructor() {
    this.loginUserRole="Admin";
    this.todayDate=new Date();
    this.fontSize = 23;
  }
  callBackChangeFontSize(step:number){
    this.fontSize=this.fontSize+step;
  }
  ngOnInit(): void {
  }
  setNewRole(newRole:string){
    this.loginUserRole=newRole;
  }
}
