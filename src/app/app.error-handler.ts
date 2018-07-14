import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';
// import {throwError} from 'rxjs/operators;

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  /* handleError(error: HttpErrorResponse | any) {
    let errorMessage: string;

    /* if (error instanceof HttpErrorResponse) {
      const body = error.error;
      errorMessage = `${error.url}: ${error.status} - ${error.statusText || ''} ${body}`;
    } else {
      errorMessage = error.toString();
    }

  } */

  constructor(private ns: NotificationService,
              private injector: Injector,
              private zone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    // this.ns.notify('ERRO');
if (errorResponse instanceof HttpErrorResponse) {
  const message = errorResponse.error.message;
  this.zone.run(() => {

    switch (errorResponse.status) {

      case 401:
       // this.ns.notify(message || '');
       this.injector.get(LoginService).handleLogin()
      break;

      case 403:
        this.ns.notify(message || 'Não autorizado.');
      break;

      case 404:
        this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes');
      break;

    }

  })

}

    super.handleError(errorResponse);
  }
}
