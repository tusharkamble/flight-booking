import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { AuthenticationGuard } from './authentication.guard';
import { FormDemoComponent } from './form-demo/form-demo.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TestPractComponent } from './test-pract/test-pract.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},  

  

  // {path:"admin",component:AdminComponent,canActivate:[AuthenticationGuard]},
  {
    path:"app",canActivate:[AuthenticationGuard],
    loadChildren:()=>
    import("./app-dashboard/app-common/app-common.module").then((m)=>m.AppCommonModule)
  },

  {path:"ng-demo",component:TestPractComponent,canActivate:[AuthenticationGuard],},
  {path:"ng-forms-demo",component:FormDemoComponent,canActivate:[AuthenticationGuard],},
  {path:"",redirectTo:"/login",pathMatch:"full"},

  {path:"**",component:NotFoundComponent,canActivate:[AuthenticationGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
