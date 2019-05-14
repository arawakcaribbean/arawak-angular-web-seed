import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/user/authentication.service';
import { BaseComponent } from '../_component/base-component';
import { I18NextService } from 'angular-i18next';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Globals } from './globals';


@Injectable()
export class ErrorInterceptor extends BaseComponent implements HttpInterceptor {
    constructor(public _rotuer: Router,
        public toastr: ToastrService,
        public i18n: I18NextService,
        public config: Globals,
        public authenticationService: AuthenticationService) {
        super(authenticationService,toastr, i18n, config)
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                //this.authenticationService.logout();
                //location.reload(true)
                this._rotuer.navigate(['/'])

            }
            if ([501].indexOf(err.status) !== -1) {
               this.showSnackBar('error',this.trans('Error connecting to services'));

            }


            return throwError(err);
        }))
    }
}