import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ErrorForwardingService } from './error-forwarding.service';

describe('ErrorForwardingService', () => {
  const locationMock = jasmine.createSpyObj('Location', { path: '/xpto' });
  const routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Location,
          useValue: locationMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    });
  });

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should navigate to error page', () => {
    const service: ErrorForwardingService = TestBed.get(ErrorForwardingService);
    service.navigate({ status: 404, statusText: 'not found' });

    expect(locationMock.path).toHaveBeenCalled();
    expect(locationMock.path).toHaveBeenCalledTimes(1);

    expect(routerMock.navigate).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/error/404'], {
      skipLocationChange: true,
      queryParams: { url: '/xpto', message: 'not found' }
    });
  });
});
