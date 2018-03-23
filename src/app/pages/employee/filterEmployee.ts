import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./employee";
import { forEach } from "@angular/router/src/utils/collection";

@Pipe({
    name: 'filterManager'
})

export class FilterManagerPipe implements PipeTransform {

    transform(employees: Employee[],employeeManageselectId) {

        return employees.filter(function (nm) {
            //   this.employees = Object.assign( new Employee(),this.employees);
            for (let i of nm.responsibilities) {
                if (i.toLowerCase() == 'manager') {
                    if(nm.id!==employeeManageselectId){
                        console.log("không hiển thị chính mi  "+ employeeManageselectId);
                        return nm;
                    }
                   
    



                }
            }
        })
    }
}