import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardServiceService } from '../services/authguard-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  componentName:string=LoginComponent.name;
  placeholder_password:string="type your password here";
  placeholder_email:string="type your email here";
  listOfUser = ["Tushar","Ganu","John","Hari"];

  user:any={};

  constructor( private authService:AuthguardServiceService,private router:Router) { 

  }
  navigateAsPerUserDetails(){
    let userDetail:any=JSON.parse(localStorage["User"]);
    if(userDetail && userDetail?.role)
    {
      if(userDetail?.role.toUpperCase()==="USER"){
        return this.router.navigateByUrl("/app/booking/add");
      }else if(userDetail?.role.toUpperCase()==="ADMIN"){
        return this.router.navigateByUrl("/app/admin");
      }
    }
    this.authService.logout();
    return this.router.navigateByUrl("/login");
  }
  submitCredentials(email:string, password:string){
    this.user.EmailId=email;
    this.user.Password=password;
    this.authService.authenticateUser(this.user)
    .subscribe((res: any) => {
      console.log(res);
      localStorage["Token"]=res.token;
      localStorage["User"]=JSON.stringify(res.user);
      this.navigateAsPerUserDetails();
    });
  }
  
  ngOnInit(): void {
    //localStorage.setItem("User",this.user);
  }

}
