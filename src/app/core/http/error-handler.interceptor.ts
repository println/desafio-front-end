import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { Logger } from '../services';
import { ErrorForwardingService } from './error-forwarding.service';

const log = new Logger('ErrorHandlerInterceptor');

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private service: ErrorForwardingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(request, error)));
  }

  private errorHandler(
    request: HttpRequest<any>,
    response: HttpEvent<any>
  ): Observable<HttpEvent<any>> {
    if (!environment.production) {
      log.error('Request error', response);
    }
    const code = Math.trunc((response as any).status / 100);
    if (request.method === 'GET' && code >= 4) {
      const fakeResponse = this.createFakeResponse(response);
      log.warn('Fake Response', fakeResponse);
      return of(fakeResponse).pipe(
        take(1),
        finalize(() => {
          this.service.navigate(response);
        })
      );
    }

    throw response;
  }

  private createFakeResponse(response: any) {
    return new HttpResponse<any>({
      body: {},
      headers: response.headers,
      status: 200,
      statusText: 'OK',
      url: response.url
    });
  }
}
