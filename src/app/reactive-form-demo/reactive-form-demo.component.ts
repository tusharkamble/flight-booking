import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-demo',
  templateUrl: './reactive-form-demo.component.html',
  styleUrls: ['./reactive-form-demo.component.css']
})
export class ReactiveFormDemoComponent implements OnInit {
  fd_UserInfo:any;
  fc_UserInfo:any;
  // userName:string;
  constructor() { 
    
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createFormUsingCreatedFormControls();
  }
  createFormControls(){
    this.fc_UserInfo={
      name:new FormControl("",[
        Validators.required
        ,Validators.minLength(3)
      ]),
      mobileNumber:new FormControl("",[
        Validators.required
        //,Validators.pattern('/^\d{10}$/')
      ])
    }
  }
  createFormUsingCreatedFormControls(){
    this.fd_UserInfo=new FormGroup(
      this.fc_UserInfo      
    );
  }
  onSubmitForm(data:any){
    if(this.fd_UserInfo.valid){
      console.log(data);
      this.fd_UserInfo.reset();
    }else{
      console.log("Invalid data.");
    }
  }
}
