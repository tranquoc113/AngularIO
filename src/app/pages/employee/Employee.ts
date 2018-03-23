

export class Employee {
 // id:number|string;
id:string;
firstName : string;
lastName :string;
gender :boolean;
phone : string;
address :string
salary :number;
state:boolean;
responsibilities :Array<string>;
payRate: number;
getPayRate(){
  this.payRate;
}
private manager:Employee;



setManager(employ:Employee){
this.manager=employ;
}

getManager(){
  return this.manager;
}
// addResponsibility(responsibility:string){
// responsibilities=responsibility;
// }

Employee(){
  
}
// constructor(id:string,firstName:string,lastName:string,gender:boolean,phone:string,address:string,salary:number,responsibilities:Array<string>){
//  // this.id
//   this.id=id;
//   this.firstName=firstName;
//   this.lastName=lastName;
//   this.gender=gender;
//   this.phone=phone;
//   this.address=address;
//   this.salary=salary;
//   this.responsibilities=responsibilities;
// }
  }

  
  



