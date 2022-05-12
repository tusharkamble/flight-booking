import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardServiceService } from '../services/authguard-service.service';

@Component({
  selector: 'app-module-navigation',
  templateUrl: './module-navigation.component.html',
  styleUrls: ['./module-navigation.component.css']
})
export class ModuleNavigationComponent implements OnInit {
  userInfo:any;
  role:string="";
  ucRole:string="";

  constructor(private authService:AuthguardServiceService,private router:Router) { 
    this.userInfo=JSON.parse(localStorage.getItem("User")||"{}");
    this.role=this.userInfo.role;
    this.ucRole=this.role?this.role.toUpperCase():"";
  }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
