import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RESOURCES } from '@app/config/resources.config';
import { Employee } from '@app/shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly resource = RESOURCES.employee;

  constructor(protected http: HttpClient) {}

  public findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.resource);
  }

  public findById(id): Observable<Employee> {
    return this.http.get<Employee>(`${this.resource}/${id}`);
  }
}
