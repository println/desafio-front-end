import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RESOURCES } from '@app/config/resources.config';

@Injectable({
  providedIn: 'root'
})
export class BasicEmployeeService {
  protected readonly resource = RESOURCES.employee;

  constructor(protected http: HttpClient) {}

  count(): Observable<number> {
    return this.http.get<number>(`${this.resource}/count`);
  }
}
