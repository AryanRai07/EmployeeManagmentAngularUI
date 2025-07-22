import {  CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee2 } from '../../services/employee-2';
import { map, Observable } from 'rxjs';
import { EmployeeData, IApiResponce,IProject } from '../../Modal/Employee';

@Component({
  selector: 'app-project',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project {

  employeeSer=inject(Employee2)

  currentView:String='List';
  projectForm:FormGroup=new FormGroup({});
  employeeData:any=[];
  //empApiResponce$:Observable<IApiResponce>=new Observable<IApiResponce>();
  //empData$:Observable<EmployeeData[]>=new Observable<EmployeeData[]>();



  constructor(){
    this.initializeForm();
   // this.empApiResponce$=this.employeeSer.getAllEmployee();
    //this.empData$=this.empApiResponce$.pipe(map(res => res.data as EmployeeData[]));
    this.employeeSer.getAllEmployee().subscribe((res:IApiResponce)=>{
      if(res.status){
        this.employeeData=res.data;
      }
    })
    
  }

initializeForm() {
  this.projectForm = new FormGroup({
    projectId: new FormControl(0),
    projectName: new FormControl(""),
    clientName: new FormControl(""),
    startDate: new FormControl(""),
    leadByEmpId: new FormControl(0),
    contactPerson: new FormControl(""),
    contactNo: new FormControl(""),
    emailId: new FormControl(""),
    createdBy: new FormControl(""),
    createdDate: new FormControl("")
  });
}

saveProject(){
 const formValue=this.projectForm.value;
 this.employeeSer.createNewProject(formValue).subscribe({next :(res:IApiResponce)=>{
  if(res.status){
    console.log(res.data)
  }else{
    alert(res.data);
  }
 },
 error: (err) => {
    console.error("Unexpected error:", err);
    // Show an alert, toast, or fallback UI
    const msg = err?.error?.msg || "Unknown error";
      const errorList = err?.error?.data || [];
      // Join all errors into a single string
      const fullMessage = msg + "\n" + errorList.join('\n');
      alert(fullMessage);
  }
  })
}


}
