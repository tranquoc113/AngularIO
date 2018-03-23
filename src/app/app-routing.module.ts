import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { EmployeeComponent }      from './pages/employee/list-employee/list-employee';
import { CreateEmployeeComponent }      from './pages/employee/create-employee/create-employee.component';

import{UpdateManagerComponent} from'./pages/employee/update-manager/update-manager.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './pages/home/home.module#HomeModule'},

  {path: 'employee', component: EmployeeComponent},
// {path: 'employee', loadChildren: './pages/employee/employee.module#EmployeeModule'},

 {path: 'create-employee', component: CreateEmployeeComponent},

 { path: 'employee/:id', component: CreateEmployeeComponent },
 { path: 'updateManager/:id', component: UpdateManagerComponent },
 



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
