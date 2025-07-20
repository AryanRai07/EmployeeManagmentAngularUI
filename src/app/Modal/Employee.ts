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