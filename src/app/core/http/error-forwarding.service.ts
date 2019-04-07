import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@app/core/services';
import { ROUTES } from '@app/config/routes.config';

const log = new Logger('ErrorForwardingService');

@Injectable({
  providedIn: 'root'
})
export class ErrorForwardingService {
  constructor(private router: Router, private location: Location) {}

  navigate(response: any): void {
    log.warn('Redirect to error page', response.status);
    const message: string = this.getMessage(response);
    this.router.navigate([`/${ROUTES.error}/${response.status}`], {
      skipLocationChange: true, // minimal effect. see https://github.com/angular/angular/issues/17004
      queryParams: { url: this.location.path(), message }
    });
  }

  private getMessage(response: any) {
    if (!response.error) {
      return response.statusText;
    }

    if (response.error.detail) {
      return response.error.detail;
    }

    if (response.error.title) {
      return response.error.title;
    }
  }
}
