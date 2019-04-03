import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorCodeResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const url = route.queryParams.url;
    const message = route.queryParams.message;
    const code = route.paramMap.get('statusCode');
    return of({ code, message: message ? message : '', url });
  }
}
