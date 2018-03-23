import { Injectable } from '@angular/core';
import { Employee } from './Employee';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClientModule } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
// let ELEMENT_DATA: Employee[] = [
//   { id: "001", firstName: "Trân ", lastName: "A", gender: true, phone: "0985269200", address: "Tam kỳ", salary: 2322, state: false, responsibilities: ['Manager', 'Developer', 'Supporter'] },
//   { id: "002", firstName: "Trân ", lastName: "B", gender: false, phone: "0985269200", address: "Tam kỳ", salary: 2322, state: false, responsibilities: ['Manager', 'Designer', 'Supporter'] },
//   { id: "003", firstName: "Trân ", lastName: "C", gender: true, phone: "0985269200", address: "Tam kỳ", salary: 2322, state: false, responsibilities: ['Developer'],
// manager:{ id: "001", firstName: "Trân ", lastName: "A", gender: true, phone: "0985269200", address: "Tam kỳ", salary: 2322, state: false, responsibilities: ['Manager', 'Developer', 'Supporter']}}
// ] as Array<Employee>;


@Injectable()
export class EmployeeService {
employees: Array<Employee> = [];
  

  constructor(private http:HttpClient){
    this.generateData();
  }
  //get Employee
  getEmployee() {
    return this.employees;
  }

  //get Employee from Id
  getEmployeeId(id: string): Employee {
    return this.employees.find(p => p.id == id);
  }

  //add Employee
  addEmployee(dataAdd: Employee) {
    this.employees.push(dataAdd);
  }

  //update employee
  updateEmployee(dataEmployee: Employee) {
    let originalPerson = this.employees.find(p => p.id === dataEmployee.id);
    if (originalPerson) Object.assign(originalPerson, dataEmployee);
  }



  updateManager(dataEmployee:Employee,callback:Function,param){
    // this.http.post(url,params).subscribe(
    //     (result)=>{
    //       callback();
    //     },
    //     (error)=>{
    //       console.error('Data Errorr: ',error.message);
    //     }
    //)

  //   this.http.get(url,{params:param}).subscribe(
  //     (result)=>{
  //       callback();
  //     },
  //     (error)=>{
  //       console.error('Data Errorr: ',error.message);
  //     }
  // )
  }

  //delete Employee
  deleteEmployee(Id: string) {
    let originalPerson = this.employees.find(p => p.id === Id);
    this.employees.splice(this.employees.indexOf(originalPerson), 1);

  }
  //delete Many Employees
  deleteEmployeeMany() {

    for (let va in this.employees) {

      let originalPerson = this.employees.find(p => p.state === true);

      if (originalPerson) {

        this.employees.splice(this.employees.indexOf(originalPerson), 1);
      }
    }
  }


  // manager: Employee[];
  // getEmployeeManager() {
  //   var check = false;
  //   for (var i = 0; i < ELEMENT_DATA.length; i++) {
  //     let repon=ELEMENT_DATA[i].responsibilities;
  //     for(let item of repon){
  //       if (item == 'Manager') { 
  //       check = true;
  //     }
  //   }
  //   if(check){
  //     this.manager.push(ELEMENT_DATA[i]);


  //     let da=this.manager;
  //     let db=da;
  //   }
  //   }
    
  //   return of(this.manager);
  // }



   managers:Employee[]=[];
  getEmployeeManager(){

    this.managers=[];
      for (let i of this.employees){
          for (let j of i.responsibilities){
              if(j.toLowerCase() == 'manager'){
                  //console.log(i)
                  this.managers.push(i);
              }
          }
      }
      return of(this.managers)
      //console.log(this.manager)
  }

  
  getManagerFromId(id){

    var objectEmployee=this.getEmployeeId(id);

          for (let item of objectEmployee.responsibilities){
              if(item.toLowerCase() == 'manager'){
                  return true;
              }
            }     
  }
  getByid(id: string){
    let rs = this.employees.find(p => p.id === id);
    return rs;
}



generateData(){
  let manager: Employee = Object.assign(new Employee(),{id: '2', firstName: 'trung', lastName: 'Quốc', gender: true, phone: '0966745234', address: 'quang nam', salary: 323,state:false, responsibilities:['Manager' , 'Developer' , 'Designer' , 'Supporter']});

  let employees: Array<Employee>= [
      Object.assign(new Employee(),{id: '1', firstName: 'thuy', lastName: 'nguyen', gender: true, phone: '01685191666', address: 'quang nam', salary: 123,state:false, responsibilities:['Manager' , 'Developer' , 'Designer' , 'Supporter']}),
      manager,
      Object.assign(new Employee(),{id: '3', firstName: 'quoc', lastName: 'tran', gender: true, phone: '01688888809', address: 'quang nam', salary: 662,state:false, responsibilities:['Developer']},
      ),
      Object.assign(new Employee(),{id: '4', firstName: 'kieu', lastName: 'tran', gender: false, phone: '01688888809', address: 'quang nam', salary: 662,state:false, responsibilities:['Developer', 'Manager'], manager: manager}
      )
  ];
  this.employees = employees;
}
}
