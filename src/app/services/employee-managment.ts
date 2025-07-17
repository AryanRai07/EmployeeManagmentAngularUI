import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponce } from '../Modal/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagment {

  constructor(private http:HttpClient) { }

 url:string="http://localhost:8081/em_portal/";

  loginAPI(data:any){
    return this.http.post("http://localhost:8081/em_portal/login",data);
  }

  getParentDept(){
    return this.http.get<IApiResponce>(this.url+"getDepartmentList");
  }

  getChildDeptByParentId(id:number) :Observable<IApiResponce>{
    return this.http.get<IApiResponce>(this.url+"childDepartment/"+id);
  }

}
