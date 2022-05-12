import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from '../components/add-booking/add-booking.component';
import { BookingDashboardComponent } from '../components/booking-dashboard/booking-dashboard.component';
import { BookingHistoryComponent } from '../components/booking-history/booking-history.component';
import { ManageBookingComponent } from '../components/manage-booking/manage-booking.component';

const routes: Routes = [
  {
    path:"",component:BookingDashboardComponent,
    children:[
      {path:"add",component:AddBookingComponent},
      {path:"manage",component:ManageBookingComponent},
      {path:"history",component:BookingHistoryComponent},
      {path:"",redirectTo:"add",pathMatch:"full"},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
