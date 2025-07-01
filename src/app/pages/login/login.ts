
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeManagment } from '../../services/employee-managment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

constructor(private employeeService:EmployeeManagment){}
router=inject(Router);


loginObj:any={
  "userName":"",
  "password":""
}
onLogin(){
  debugger
  return this.employeeService.loginAPI(this.loginObj).subscribe((res:any)=>{
    if(res.result){
      debugger
      localStorage.setItem('employeeApp',JSON.stringify(res.data));
      this.router.navigateByUrl('dashboard');
    }else{
      debugger
      alert(res.message);
    }
  })
}




}
