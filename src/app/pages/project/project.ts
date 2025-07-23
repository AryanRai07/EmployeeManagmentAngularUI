import {  CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee2 } from '../../services/employee-2';
import { map, Observable } from 'rxjs';
import { EmployeeData, IApiResponce,IProject } from '../../Modal/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project {

  employeeSer=inject(Employee2)
   private router=inject(Router)

  currentView:String='List';
  projectForm:FormGroup=new FormGroup({});
  employeeData:any=[];
  projectData:IProject[]=[];
  //empApiResponce$:Observable<IApiResponce>=new Observable<IApiResponce>();
  //empData$:Observable<EmployeeData[]>=new Observable<EmployeeData[]>();

  constructor(){
    this.initializeForm();
   // this.empApiResponce$=this.employeeSer.getAllEmployee();
    //this.empData$=this.empApiResponce$.pipe(map(res => res.data as EmployeeData[]));
    this.getAllProjectData();

    this.employeeSer.getAllEmployee().subscribe((res:IApiResponce)=>{
      if(res.status){
        this.employeeData=res.data;
      }
    })
    
  }

initializeForm() {
  this.projectForm = new FormGroup({
    projectId: new FormControl(null),
    projectName: new FormControl(""),
    clientName: new FormControl(""),
    startDate: new FormControl(""),
    leadByEmpId: new FormControl(0),
    contactPerson: new FormControl(""),
    contactNo: new FormControl(""),
    emailId: new FormControl(""),
    createdBy: new FormControl(1),
    createdDate: new FormControl(new Date().toISOString())
  });
}

 getAllProjectData(){
    this.employeeSer.getAllProjectData().subscribe({next:(res:IApiResponce)=>{
     if(res.status){
      this.projectData=res.data;
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

saveProject(){
  this.projectForm.patchValue({ leadByEmpId: Number(this.projectForm.value.leadByEmpId) });

 const formValue=this.projectForm.value;
 
 this.employeeSer.createNewProject(formValue).subscribe({next :(res:IApiResponce)=>{
  if(res.status){
    alert(res.msg);
    //this.router.navigate(['/dashboard']); // 🔁 Redirect here
     this.getAllProjectData();
     this.currentView='List';
  }else{
    alert(res.msg);
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

editProject(data:IProject){

}

deleteProject(id:number){

}


}
