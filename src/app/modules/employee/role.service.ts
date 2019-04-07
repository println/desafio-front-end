import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { RESOURCES } from '@app/config/resources.config';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly resource = RESOURCES.role;

  constructor(protected http: HttpClient) {}

  findAll(): Observable<string[]> {
    return this.http.get<string[]>(this.resource).pipe(take(1));
  }
}
