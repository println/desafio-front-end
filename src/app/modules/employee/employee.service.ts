import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RESOURCES } from '@app/config/resources.config';
import { Employee } from '@app/shared/models/employee.model';
import { map, take } from 'rxjs/operators';
import { Page } from '@app/shared/services/paging/page.model';
import { PageBuilder } from '@app/shared/services/paging/page.builder';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly resource = RESOURCES.employee;

  constructor(protected http: HttpClient) {}

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
}
