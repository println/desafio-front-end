import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { Employee } from '@app/shared/models/employee.model';
import { EmployeeService } from '@app/modules/employee/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResolver implements Resolve<Employee> {
  constructor(private service: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Employee> {
    const employeeId = route.paramMap.get('employeeId');
    return this.service.findById(employeeId);
  }
}
