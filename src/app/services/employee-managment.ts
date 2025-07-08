import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagment {

  constructor(private http:HttpClient) { }

  loginAPI(data:any){
    return this.http.post("http://localhost:8081/em_portal/login",data);
  }
}
