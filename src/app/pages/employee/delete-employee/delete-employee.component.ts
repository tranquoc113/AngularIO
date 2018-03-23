import { Component, OnInit, ViewChild, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { EmployeeService } from '../employee.service';
import { Employee } from '../Employee';
@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {



  aler:boolean=false;
  employees: Employee[];
  //templace model dialog
  @ViewChild('template') template;

  modalRef: BsModalRef;

  message: string;

  //get data from HTML
  @Input() data;
  //

  inforDelete: string;

  @Input() callback;

  show:boolean;

  constructor(private modalService: BsModalService, private employeeService: EmployeeService) { }

  ngOnInit() {}

  OnChanges(){}


  //openModal
  public openModal() {
    this.modalRef = this.modalService.show(this.template, { class: 'modal-sm' });
  }
  //hide Modal
  public hide(): void {

    this.message = 'Declined!';
    this.modalRef.hide();
  }



  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  //delete Employee
  deleteEmployee(emp: string): void {

    this.message = 'Confirmed!';

    this.employeeService.deleteEmployee(emp);

    //callback

    this.callback="Xóa thành công";
    this.change.emit(this.callback);

    //hide
    this.modalRef.hide();
  }

//get Employee
  getEmployee(): void {
   this. employees =this.employeeService.getEmployee();
  }

  deleteMany() {
this.getEmployee();
    for(let item of this.employees){
      let status = this.employees.find(p => p.state === true);
      if (status) {
        this.employeeService.deleteEmployeeMany();
        
      }else{
        
      }


    }

   
 
    // this.show=true;
    // this.data=false;
    // this.getEmployee();
    // let count = 0;
    // for (let state of this.employees) {
    //   if (state.state == true) {

    //     count += 1;

    //   } else {
    //     this.inforDelete = "Chọn dòng để  xóa";
    //   }
    // }
    // if (count > 0) {
    //   this.inforDelete = "Sẽ xóa " + count + "bản ghi";
    // }
    // this.openModal(); 
   
  }
  methodDelete() {

     // this.data.val=false;
    
  

    let status = this.employees.find(p => p.state === true);
    if (status) {
      this.employeeService.deleteEmployeeMany();
      this.hide();
    }
  }

}
