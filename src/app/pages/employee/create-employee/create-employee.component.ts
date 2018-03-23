import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../Employee';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {

  //array
  employee: Employee[];

  //
  @Input() model: Employee;

  //delete router
  subscription: Subscription;

  //Vilidate
  employeeForm: FormGroup;

  //
  responsibilitie =['Manage' , 'Developer' , 'Designer' , 'Supporter'];

  //hide input id if update, show input id if create
  showInputId: string = "";

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute,
    private location: Location, private activatedRoute: ActivatedRoute, @Inject(FormBuilder) fb: FormBuilder) { }

  //////
  OnDestroy() {
    this.subscription.unsubscribe();
  }

  //get param from router
  ngOnInit() {
    //get data employee
    this.getEmployee();


    this.subscription = this.activatedRoute.params.subscribe(params => {
      //get id
      let id = params['id'];
      //not id
      if (id == undefined) {
        //create Oject null
        this.model = new Employee();

        //show input Id
        this.showInputId = "have";
      } else {
        //get from Id if router has id
        this.model = this.employeeService.getEmployeeId(id);
        //hide input Id put update
        this.showInputId = "";
      }
    });

    //Validation
    this.employeeForm = new FormGroup({
      'id': new FormControl('', [
        Validators.required,
        Validators.minLength(4),

      ]),
      'firstName': new FormControl('', [
        Validators.required
      ]),
      'lastName': new FormControl('', [
        Validators.required
      ]),
      'gender': new FormControl('', [Validators.required]),
      'phone': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'salary': new FormControl('', [Validators.required]),
      'responsibilities': new FormControl('', [Validators.required])
    });
  }
  get id() { return this.employeeForm.get('id'); }
  get firstName() { return this.employeeForm.get('firstName'); }
  get lastName() { return this.employeeForm.get('firstName'); }
  get gender() { return this.employeeForm.get('gender'); }
  get phone() { return this.employeeForm.get('phone'); }
  get address() { return this.employeeForm.get('address'); }
  get salary() { return this.employeeForm.get('salary'); }
  get responsibilities() { return this.employeeForm.get('responsibilities'); }


  //get Employee
  getEmployee(): void {
   this.employee= this.employeeService.getEmployee()
      
  }

  //save and update employee
  saveEmployee(em: Employee): void {

    
    let status = this.employee.find(p => p.id === em.id);
    if(status){
       //update Employee
       this.employeeService.updateEmployee(em);
       //back list Employee
       this.goBack();
    }else
    {
      em.state=false;
        //add new Employee
        this.employeeService.addEmployee(em);
        //back list Employee
        this.goBack();
    }

  }
  //method back
  goBack(): void {
    this.location.back();
  }

}
