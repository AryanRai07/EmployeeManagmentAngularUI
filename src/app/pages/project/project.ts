import {  CommonModule, formatDate } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee2 } from '../../services/employee-2';
import { map, Observable } from 'rxjs';
import { EmployeeData, IApiResponce,IProject } from '../../Modal/Employee';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-project',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project {

  employeeSer=inject(Employee2)
   private router=inject(Router)

  // @ViewChild("myModal") employeeDataModal : ElementRef | undefined;
   showModal = false;
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

  onAddEmployee(id:number):void{
  //this.showModal=true;
    $('#projectModal').modal('show');
  
  }

  hideModal():void{
     $('#projectModal').modal('hide');
  }

initializeForm(data?:IProject) {
  this.projectForm = new FormGroup({
    projectId: new FormControl(data ? data.projectId:0),
    projectName: new FormControl(data ? data.projectName:""),
    clientName: new FormControl(data ? data.clientName:""),
    startDate: new FormControl(data?.startDate ? formatDate(data.startDate, 'yyyy-MM-dd', 'en') : ''),
    leadByEmpId: new FormControl(data ? data.leadByEmpId:""),
    contactPerson: new FormControl(data ? data.contactPerson:""),
    contactNo: new FormControl(data ? data.contactNo:""),
    emailId: new FormControl(data ? data.emailId:""),
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
 if(formValue.projectId==0){
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
}else{
  this.employeeSer.updateProjectData(formValue).subscribe({next : (res:IApiResponce)=>{
      if(res.status){
        alert(res.msg);
        this.getAllProjectData();
        this.currentView='List';
         this.initializeForm();
      }else{
        alert(res.msg)
      }
    },
    error:(err)=> {
      const msg=err?.error?.msg || "Unknown error";
      const errorList=err?.error?.data || [];
      alert(msg+"\n"+errorList.join('\n'));
    },
  })
}
}

editProject(data:IProject){
this.initializeForm(data);
this.currentView='Current';
}

deleteProject(id:number){
  if(confirm("Are you sure you want to delete this project?")){
    this.employeeSer.deleteProject(id).subscribe({next:(res:IApiResponce)=>{
        if(res.status){
          alert(res.msg);
          this.getAllProjectData();
         
        }else{
          alert(res.msg);
        }
      },
      error:(err)=> {
        alert(err);
      },
    })
  }
}




}
