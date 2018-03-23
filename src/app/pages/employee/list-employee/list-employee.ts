import { Component, OnInit, ViewChild, Injectable, Inject, Input, TemplateRef, OnChanges, Directive, ElementRef } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../Employee';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteEmployeeComponent } from "../delete-employee/delete-employee.component";


@Component({
  selector: 'app-employee',
  templateUrl: './list-employee.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {

  //dataEmployee
  employees: Employee[];
  //data set ComponentDelete
  inputVariable: any;

  //when checkbox checked all
  checkedAllITem = false;
  //checked box checked one item any
  checkedItem = false;


  showbtn = false;

  checkItemEmployee = false;


  values = true;

  callback = "";

  //

  //  @ViewChild ('remove') remove:DeleteEmployeeComponent;
  //   private deleteEmployee:DeleteEmployeeComponent;


  //using ViewChild
  @ViewChild(DeleteEmployeeComponent) removeEmployee: DeleteEmployeeComponent;

  //khởi tạo employeeService
  constructor(private employeeService: EmployeeService) {
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

  ngOnInit() {
    //call method lấy dữ liệu khi component được gọi
    this.getEmployee();

  }

  ngOnChanges() {

  }



  //method get data from service
  getEmployee(): void {
    this.employees = this.employeeService.getEmployee();
  }



  //click OpenModel 
  openModel(obj) {

    //set object from HTML move componetDelete
    this.inputVariable = obj;

    this.values = false;

    //use ViewChild get openModel from ComponetDelete 
    this.removeEmployee.openModal();
  }

  //event check all of check box
  checkAll(ev) {

    this.showbtn = true;
    //if checkItem=true
    if (this.checkedAllITem) {

      //all checked Item true
      this.checkedItem = true;
      //set database state true
      this.employees.forEach(x => x.state = true);

    } else {
      this.showbtn = false;
      //all check Item disalbe
      this.checkedItem = false;
      //set database state false
      this.employees.forEach(x => x.state = false);

    }
  }

  //checkbox item any
  checkItem(id) {

    this.showbtn = true;

    //checkbox all false
    this.checkedAllITem = false;

  }
  //event output data form ComponentDelete
  onDelete(event) {
    this.callback = event;
  }

  deleteMany() {
    this.removeEmployee.deleteMany();
  }

  funtionManager(id) {

    if(this.employeeService.getManagerFromId(id)){
      return true;
    }else{
      return false;
    }
  }

}










