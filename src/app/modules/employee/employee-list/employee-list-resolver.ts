import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { Employee } from '@app/shared/models/employee.model';
import { EmployeeService } from '@app/modules/employee/employee.service';
import { Page, ServerParamsFilter } from '@app/shared/services/paging';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolver implements Resolve<Page<Employee>> {
  constructor(private service: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Page<Employee>> {
    const params = ServerParamsFilter.filter(route.queryParams, ['name', 'age', 'role']);
    return this.service.findAll(params);
  }
}
