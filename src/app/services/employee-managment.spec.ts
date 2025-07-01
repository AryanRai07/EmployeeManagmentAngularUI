import { TestBed } from '@angular/core/testing';

import { EmployeeManagment } from './employee-managment';

describe('EmployeeManagment', () => {
  let service: EmployeeManagment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeManagment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
