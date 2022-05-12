import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AirlineListComponent } from './airline-list/airline-list.component';
import { AddAirlineComponent } from './admin/add-airline/add-airline.component';
import { AirlineService } from './services/airline.service';
import { ResizeComponent } from './resize/resize.component';
import { TestPractComponent } from './test-pract/test-pract.component';
import { FlightInventoryComponent } from './flight-inventory/flight-inventory.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { ReactiveFormDemoComponent } from './reactive-form-demo/reactive-form-demo.component';
import { AuthguardServiceService } from './services/authguard-service.service';
import { BookingDashboardComponent } from './modules/components/booking-dashboard/booking-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './modules/components/header/header.component';
import { AddBookingComponent } from './modules/components/add-booking/add-booking.component';
import { ManageBookingComponent } from './modules/components/manage-booking/manage-booking.component';
import { BookingHistoryComponent } from './modules/components/booking-history/booking-history.component';
import { ModuleNavigationComponent } from './module-navigation/module-navigation.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { SelectFlightListComponent } from './modules/components/select-flight-list/select-flight-list.component';
import { BookingService } from './services/booking.service';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { DiscountListComponent } from './discount-list/discount-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AirlineListComponent,
    AddAirlineComponent,
    ResizeComponent,
    TestPractComponent,
    FlightInventoryComponent,
    AddScheduleComponent,
    FormDemoComponent,
    ReactiveFormDemoComponent,
    BookingDashboardComponent,
    NotFoundComponent,
    HeaderComponent,
    AddBookingComponent,
    ManageBookingComponent,
    BookingHistoryComponent,
    ModuleNavigationComponent,
    AppDashboardComponent,
    SelectFlightListComponent,
    AddDiscountComponent,
    DiscountListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthguardServiceService,AirlineService,BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
