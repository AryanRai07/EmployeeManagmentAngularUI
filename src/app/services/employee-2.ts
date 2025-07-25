import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeData, IApiResponce, IProject, ProjectEmployee } from '../Modal/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Employee2 {

  constructor() { }

  http=inject(HttpClient);
 
  url:String='http://localhost:8081/em_portal/';

  createNewEmployee(obj:EmployeeData):Observable<IApiResponce>{
    return this.http.post<IApiResponce>(this.url+"saveData",obj);
  }
  
  getAllEmployee():Observable<IApiResponce>{
    return this.http.get<IApiResponce>(this.url+"getEmployeeList");
  }

  deleteEmployee(id:number){
    return this.http.delete<IApiResponce>(this.url+"deleteEmploye/"+id)
  }

   updateEmployee(obj:EmployeeData):Observable<IApiResponce>{
    return this.http.put<IApiResponce>(this.url+"updateEmployeee/"+obj.employeeId,obj);
  }

  createNewProject(obj:IProject):Observable<IApiResponce>{
    console.log(obj);
    return this.http.post<IApiResponce>(this.url+"createProject",obj);
  }

   getAllProjectData():Observable<IApiResponce>{
    return this.http.get<IApiResponce>(this.url+"projectData");
  }

   updateProjectData(data:IProject):Observable<IApiResponce>{
    return this.http.put<IApiResponce>(this.url+"updateProject/"+data.projectId,data);
  }

  deleteProject(id:number){
    return this.http.delete<IApiResponce>(this.url+"deleteProject/"+id);
  }

  saveProjectEmployee(data:ProjectEmployee){
    return this.http.post<IApiResponce>(this.url+"saveProjectEmployee",data);
  }

  getAllProjectWiseEmp():Observable<IApiResponce>{
    return this.http.get<IApiResponce>(this.url+"getProjectWiseEmployee");
  }
}
