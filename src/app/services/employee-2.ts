import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeData, IApiResponce } from '../Modal/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Employee2 {

  constructor() { }

  http=inject(HttpClient);
 
  url:String='http://localhost:8081/em_portal/';

  createNewEmployee(obj:EmployeeData):Observable<IApiResponce>{
    return this.http.post<IApiResponce>(this.url+"createEmployee",obj);
  }

}
