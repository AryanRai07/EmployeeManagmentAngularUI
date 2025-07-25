import { Call } from "@angular/compiler";

export class EmployeeData{
    'employeeId':number;
    'employeeName':string;
    'contactNo':string;
    'emailId':string;
    'deptId':number;
    'password':string;
    'gender':string;
    'role':string;
    'createdData': Date;

    constructor(){
        this.employeeId=0;
        this.employeeName='';
        this.contactNo='';
        this.emailId='';
        this.deptId=0;
        this.password='';
        this.gender='';
        this.role='Employee';
        this.createdData=new Date();
    }

}

export interface IParentDepartment{
    'id':number;
    'departmentName':string;
}

export interface IChildDepartment{
    'id':number;
    'childDepartmentName':string;
    'parentDepartmentId':number;
}

export interface IApiResponce{
     status:boolean;
     msg:string;    
     data:any;
}

export interface IProject {
  projectId: number;
  projectName: string;
  clientName: string;
  startDate: Date;
  leadByEmpId: number;
  contactPerson: string;
  contactNo: string;
  emailId: string;
  createdBy: number;
  createdDate: Date;
}

export class ProjectEmployee{
    empProjectId:number;
    projectId:number;
    empId:number;
    assignedData:string;
    role:string;
    isActive:string;
   

    constructor(){
        this.empProjectId=0;
        this.projectId=0;
        this.empId=0;
        this.assignedData="";
        this.role="";
        this.isActive=""
    }
}

// export class IProject{
//     projectId: number,
//     projectName: string,
//     clientName: string,
//     startDate: string,
//     leadByEmpId: number,
//     contactPerson: string,
//     contctNo: string,
//     emilId: string,
//     createdBy:number,
//     createdDate:Date

//     constructor(){
//         this.projectId=0;
//         this.projectName='';
//         this.clientName='';
//         this.startDate='';
//         this.leadByEmpId=0;
//         this.contactPerson='';
//         this.contctNo='';
//         this.emilId='';
//         this.createdBy=1;
//         this.createdDate=new Date();
//     }
// }