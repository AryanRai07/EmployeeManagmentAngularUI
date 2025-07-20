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
    this.getAllEmployeeList();
  }

  parentDeptList:IParentDepartment[]=[];
  allEmployeeDetails:any=[];
  childDeptList:IChildDepartment[]=[];
  
  mainDeptId:any="";
  employeeObj:EmployeeData=new EmployeeData();

  getAllEmployeeList(){
    this.employee2Service.getAllEmployee().subscribe({next:(res:IApiResponce)=>{
     if(res.status){
      this.allEmployeeDetails=res.data;
     }else{
      alert(res.msg);
     }
    },
    error: (err:any) => {
      console.error("Validation Error Response:", err);
      // Agar error object me msg + data array hai
      const msg = err?.error?.msg || "Unknown error";
      const errorList = err?.error?.data || [];
      // Join all errors into a single string
      const fullMessage = msg + "\n" + errorList.join('\n');
      alert(fullMessage);
    }
  });
  }

  getParentDeptList(){
    this.employeeService.getParentDept().subscribe((res:IApiResponce)=>{
      this.parentDeptList=res.data;
      console.log( this.parentDeptList);
    })
  }

  getChildDept(){
    this.employeeService.getChildDeptByParentId(this.mainDeptId).subscribe((res:IApiResponce)=>{
      this.childDeptList=res.data;
    })
  }

  onSaveEmployee(){
  this.employee2Service.createNewEmployee(this.employeeObj).subscribe({
    next: (res: IApiResponce) => {
      console.log("Response received:", res);
      debugger;
      if(res.status){
        alert("Employee creation success.");
      } else {
        alert(res.data);
      }
    },
   error: (err) => {
      console.error("Validation Error Response:", err);
      // Agar error object me msg + data array hai
      const msg = err?.error?.msg || "Unknown error";
      const errorList = err?.error?.data || [];
      // Join all errors into a single string
      const fullMessage = msg + "\n" + errorList.join('\n');
      alert(fullMessage);
    }
  });
}

deleteData(id:number){ 
  if (confirm("Are you sure you want to delete this employee?")) {
  this.employee2Service.deleteEmployee(id).subscribe({next:(res:IApiResponce)=>{
    if(res.status){
      alert(res.msg);
      this.getAllEmployeeList();
    }else{
      alert(res.msg);
    }
  },
  error: (err) => {
    alert(err);
  }
});
  }
}

editEmployee(obj:any){
 this.employeeObj.employeeId = obj.id;
  this.employeeObj.employeeName = obj.name;
  this.employeeObj.contactNo = obj.contact;
  this.employeeObj.emailId = obj.email;
  this.employeeObj.deptId = obj.departmentId;
  this.employeeObj.password = obj.password;
  this.employeeObj.gender = obj.gender;
  this.employeeObj.role = 'Employee';
  this.employeeObj.createdData = new Date(obj.createdOn);
  console.log(this.employeeObj);
}

updateData(){
  this.employee2Service.updateEmployee(this.employeeObj).subscribe({
    next: (res: IApiResponce) => {
      console.log("Response received:", res);
      debugger;
      if(res.status){
        alert("Employee updated success.");
      } else {
        alert(res.data);
      }
    },
   error: (err) => {
      console.error("Validation Error Response:", err);
      const errorList = err?.error?.data || [];
      alert(errorList);
    }
  });
}


}
