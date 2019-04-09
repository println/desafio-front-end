import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from '@app/shared/models/employee.model';
import { map, take } from 'rxjs/operators';
import { Page } from '@app/shared/services/paging/page.model';
import { PageBuilder } from '@app/shared/services/paging/page.builder';
import { Params } from '@angular/router';
import { BasicEmployeeService } from '@app/shared/services/basic-employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BasicEmployeeService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  findAll(queryParams: Params): Observable<Page<Employee>> {
    return this.http
      .get<Employee[]>(this.resource, { params: queryParams, observe: 'response' })
      .pipe(
        take(1),
        map((resp: HttpResponse<Employee[]>) => PageBuilder.build(resp, queryParams))
      );
  }

  findById(id): Observable<Employee> {
    return this.http.get<Employee>(`${this.resource}/${id}`).pipe(take(1));
  }

  deleteById(employee: Employee): Observable<any> {
    return this.http.delete<any>(`${this.resource}/${employee.id}`).pipe(take(1));
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.resource, employee).pipe(take(1));
  }

  update(id: any, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.resource}/${id}`, employee).pipe(take(1));
  }
}
