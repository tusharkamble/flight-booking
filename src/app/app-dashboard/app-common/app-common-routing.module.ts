import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/admin/admin.component';
import { AuthenticationGuard } from 'src/app/authentication.guard';
import { BookingDashboardComponent } from 'src/app/modules/components/booking-dashboard/booking-dashboard.component';
import { AppDashboardComponent } from '../app-dashboard.component';

const routes: Routes = [
  {
    path:"",component:AppDashboardComponent,
    children:[
      {path:"admin",component:AdminComponent,canActivate:[AuthenticationGuard]},
      // //For direct loading =>
      // {path:"booking",component:BookingDashboardComponent,canActivate:[AuthenticationGuard]},
      //For lazy loading =>
      {
        path:"booking",canActivate:[AuthenticationGuard],
        loadChildren:()=>
        import("../../modules/flight/flight.module").then((m)=>m.FlightModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCommonRoutingModule { }
