import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { Employee } from '@app/shared/models/employee.model';
import { EmployeeService } from '@app/modules/employee/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolver implements Resolve<Employee[]> {
  constructor(private service: EmployeeService) {}

  resolve(): Observable<Employee[]> {
    return this.service.findAll();
  }
}
