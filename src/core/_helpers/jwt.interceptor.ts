import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/user/authentication.service';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {    
    private authService: KeycloakService;
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
           
        if (this.getAuthService().isLoggedIn()) {
               
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + this.authService.getKeycloakInstance().token
                }
            });
           
        }
        

        return next.handle(request);
    }

    getAuthService(): KeycloakService {
        if (typeof this.authService === 'undefined') {
            this.authService = this.injector.get(KeycloakService);
        }
        return this.authService;
    }

   
}


/*
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}
*/