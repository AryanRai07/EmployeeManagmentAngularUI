import { Component, inject, OnInit } from '@angular/core';
import { EmployeeManagment } from '../../services/employee-managment';
import { IApiResponce, IParentDepartment } from '../../Modal/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee  implements OnInit{
  
  parentDeptList:IParentDepartment[]=[];
 selectedDeptId:any="";
  employeeService=inject(EmployeeManagment);

  ngOnInit(): void {   
    this.getParentDeptList();
  }

  getParentDeptList(){
    this.employeeService.getParentDept().subscribe((res:IApiResponce)=>{
      this.parentDeptList=res.data[0];
      console.log( this.parentDeptList);
    })
  }

}
