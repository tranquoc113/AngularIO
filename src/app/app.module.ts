import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



//import 'hammerjs';



import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

/* App Root */
import { AppComponent } from './app.component';

import {CommonModule} from '@angular/common';

/* Feature Modules */

/* Components and Directives */
import { FlexLayoutModule } from '@angular/flex-layout';




// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import {MatDialogModule} from '@angular/material/dialog';

import { FormBuilder,ReactiveFormsModule } from '@angular/forms';

//new 

import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatTableModule,




  ///

   MatAutocompleteModule,

  MatButtonToggleModule,
  MatChipsModule,
  MatDatepickerModule,

  MatGridListModule,

  MatNativeDateModule,
  MatProgressBarModule,

  MatRippleModule,
  MatSelectModule,

  MatSliderModule,

  MatSnackBarModule,
  MatStepperModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatSortModule,

//cdk


  
} from '@angular/material';

import { FormsModule } from '@angular/forms';

import { CreateEmployeeComponent } from './pages/employee/create-employee/create-employee.component';
import{EmployeeComponent} from './pages/employee/list-employee/list-employee';
import{EmployeeService} from'./pages/employee/employee.service';
import { DeleteEmployeeComponent } from './pages/employee/delete-employee/delete-employee.component';
import { UpdateManagerComponent } from './pages/employee/update-manager/update-manager.component';
import{FilterManagerPipe} from './pages/employee/filterEmployee';
import { EmployeeDirective } from './pages/employee/list-employee/employee.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    DeleteEmployeeComponent,
    UpdateManagerComponent,
    FilterManagerPipe,
    EmployeeDirective,
    
  ],


  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    BrowserModule,
    FormsModule,
   ReactiveFormsModule,



   //new 
   MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,


        //cdk



        A11yModule,
        BidiModule,
        ObserversModule,
        OverlayModule,
        PlatformModule,
        PortalModule,
        ScrollDispatchModule,
        CdkStepperModule,
        CdkTableModule,
      


// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
// HttpClientInMemoryWebApiModule.forRoot(
//   InMemoryDataService, { dataEncapsulation: false }
// )
  ],

  providers: [EmployeeService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class AppModule { }



