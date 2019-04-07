import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs';
import { Employee } from '@app/shared/models/employee.model';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFactoryResolver implements Resolve<Employee> {
  resolve(): Observable<Employee> {
    return of(new Employee());
  }
}
