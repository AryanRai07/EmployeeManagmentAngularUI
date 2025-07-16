export class Employee{
    'employeeId':number;
    'employeeName':string;
    'contactNo':string;
    'emilId':string;
    'deptId':number;
    'password':string;
    'gender':string;
    'role':string;
    'createdData': Date;
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
     message:string;
     result:boolean;
     data:any;
}