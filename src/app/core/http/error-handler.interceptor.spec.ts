import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ErrorForwardingService } from 'src/app/core/http/error-forwarding.service';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let errorHandlerInterceptor: ErrorHandlerInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const errorForwardingMock = jasmine.createSpyObj('ErrorForwardingService', ['navigate']);

  function createInterceptor(_errorForwardingService: ErrorForwardingService) {
    errorHandlerInterceptor = new ErrorHandlerInterceptor(_errorForwardingService);
    return errorHandlerInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: createInterceptor,
          deps: [ErrorForwardingService],
          multi: true
        },
        {
          provide: ErrorForwardingService,
          useValue: errorForwardingMock
        }
      ]
    });
  });

  beforeEach(inject(
    [HttpClient, HttpTestingController],
    (_http: HttpClient, _httpMock: HttpTestingController) => {
      http = _http;
      httpMock = _httpMock;
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });

  it('should catch error and call error handler', () => {
    // Arrange
    // Note: here we spy on private method since target is customization here,
    // but you should replace it by actual behavior in your app
    spyOn(ErrorHandlerInterceptor.prototype as any, 'errorHandler').and.callThrough();

    // Act
    http
      .get('/toto')
      .subscribe(() => {
        // Assert
        expect(ErrorHandlerInterceptor.prototype['errorHandler']).toHaveBeenCalled();
      })
      .add(() => {
        expect(errorForwardingMock.navigate).toHaveBeenCalled();
        expect(errorForwardingMock.navigate).toHaveBeenCalledTimes(1);
        expect(errorForwardingMock.navigate).toHaveBeenCalledWith(
          jasmine.objectContaining({ status: 404, statusText: 'Not found' })
        );
      });

    httpMock.expectOne({}).flush(null, {
      status: 404,
      statusText: 'Not found'
    });
  });
});
