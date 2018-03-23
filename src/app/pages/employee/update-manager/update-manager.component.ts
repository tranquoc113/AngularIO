import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs/Subscription';
import { FilterManagerPipe } from '../filterEmployee';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-update-manager',
  templateUrl: './update-manager.component.html',
  styleUrls: ['./update-manager.component.scss']
})
export class UpdateManagerComponent implements OnInit {
  employeeManagers: Employee[];
  employees: Employee;
  employeeOject: Employee = new Employee();

  rowterid: string="" ;
  employeeManageselectId:string="";
  employeeManageId:string="";
  //delete router
  subscription: Subscription;
  modalRef: BsModalRef;
  @ViewChild('template') template;
  constructor(private employeeService: EmployeeService,private router: Router,
    private location: Location, private activatedRoute: ActivatedRoute,private modalService: BsModalService) { }

  ngOnInit() {

    this.getEmployeeManager();


    this.subscription = this.activatedRoute.params.subscribe(params => {
      //get id
      this.rowterid = params['id'];

      //get from Id if router has id
      this.employees = this.employeeService.getEmployeeId(this.rowterid.toString());

    //  this.employeeManageId=this.employees.id;

      this.funtiongetManager();
    });
  }

  getEmployeeManager(): void {
    this.employeeService.getEmployeeManager()
      .subscribe(em => this.employeeManagers = em);
      console.log("Thủy nói  "+ this.employeeManagers);


      // for(let item of this.employeeManagers){
      //   if(item.id!=this.rowterid){
      //     this.employeeManagers.push(item);
      //   }
      // }
  }



  saveManager(emManager: Employee) {

    // if(this.employeeManageselectId==this.employeeManageId){
    //   console.log(this.employeeManageId+" +em select id and employee manage id+  "+this.employeeManageselectId);
    //   this.openModal(this.template);
    // }else{


      console.log(this.employeeService.getEmployee());
      let oneEmployee=this.employeeService.getEmployeeId(this.employeeManageselectId);

      emManager = Object.assign( new Employee(),emManager);
      oneEmployee = Object.assign(new Employee(), oneEmployee);

      console.log(' update: ',emManager);
      console.log('select : ',oneEmployee);


      emManager.setManager(oneEmployee);

      
      // emManager=oneEmployee;
    this.employeeService.updateEmployee(emManager);

   //  console.log("update "+  this.employeeService.updateEmployee(this.employeeOject.getManager()));
  
      this.goBack();

     
   // }
  }

  back() {
    this.goBack();
  }

  
  goBack(){
    let link = ['/employee'];
    this.router.navigate(link);
}

    //openModal
    public openModal(template) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
    //hide Modal
    public hide(): void {
    
      this.modalRef.hide();
    }

    funtiongetManager(){

      this.employees = Object.assign( new Employee(),this.employees);

      console.log(this.employees);

         if(this.employees.getManager())
         {
          this.employeeManageselectId = this.employees.getManager().id;
          console.log("ta nói  "+this.employeeManageselectId)
         }



      console.log("get name "+this.employeeManageId);
    }

}
