import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RESOURCES } from '@app/config/resources.config';
import { Employee } from '@app/shared/models/employee.model';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly resource = RESOURCES.employee;

  constructor(protected http: HttpClient) {}

  findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.resource);
  }

  findById(id): Observable<Employee> {
    return this.http.get<Employee>(`${this.resource}/${id}`);
  }

  query(data: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.resource, { params: data })
      .pipe(
        take(1)
      );
  }
}
