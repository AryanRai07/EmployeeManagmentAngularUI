import { Component, inject, OnInit } from '@angular/core';
import { EmployeeManagment } from '../../services/employee-managment';
import { EmployeeData, IApiResponce, IChildDepartment, IParentDepartment } from '../../Modal/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee2 } from '../../services/employee-2';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee  implements OnInit{
  
  employeeService=inject(EmployeeManagment);
  employee2Service=inject(Employee2);
  
  ngOnInit(): void {   
    this.getParentDeptList();
  }

  parentDeptList:IParentDepartment[]=[];
  childDeptList:IChildDepartment[]=[];
  mainDeptId:any="";
  employeeObj:EmployeeData=new EmployeeData();


  getParentDeptList(){
    this.employeeService.getParentDept().subscribe((res:IApiResponce)=>{
      this.parentDeptList=res.data[0];
      console.log( this.parentDeptList);
    })
  }

  getChildDept(){
    this.employeeService.getChildDeptByParentId(this.mainDeptId).subscribe((res:IApiResponce)=>{
      this.childDeptList=res.data[0];
    })
  }

  onSaveEmployee(){
    this.employee2Service.createNewEmployee(this.employeeObj).subscribe((res:IApiResponce)=>{
      if(res.result){
        alert("Employee creation success.");
      }else{
        alert(res.message);
      }
    })
  }

}
