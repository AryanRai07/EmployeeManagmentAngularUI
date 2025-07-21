import {  CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee2 } from '../../services/employee-2';
import { map, Observable } from 'rxjs';
import { EmployeeData, IApiResponce } from '../../Modal/Employee';

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
        this.employeeData
      }
    })
    
  }

initializeForm() {
  this.projectForm = new FormGroup({
    projectId: new FormControl(0),
    projectName: new FormControl(""),
    clientName: new FormControl(""),
    startDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    contactPerson: new FormControl(""),
    contctNo: new FormControl(""),
    emilId: new FormControl("")
  });
}


}
