import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/user/authentication.service';
import { KeycloakService, KeycloakAuthGuard } from 'keycloak-angular';


@Injectable({ providedIn: 'root' })
export class AuthGuard  extends KeycloakAuthGuard {
    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
      super(router, keycloakAngular);
    }
   
    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      return new Promise((resolve, reject) => {
        if (!this.authenticated) {
          this.keycloakAngular.login();
          return;
        }
   
        const requiredRoles = route.data.roles;
        if (!requiredRoles || requiredRoles.length === 0) {
          return resolve(true);
        } else {
          if (!this.roles || this.roles.length === 0) {
            resolve(false);
          }
          let granted: boolean = false;
          for (const requiredRole of requiredRoles) {
            if (this.roles.indexOf(requiredRole) > -1) {
              granted = true;
              break;
            }
          }
          resolve(granted);
        }
      });
    }


   /*
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
            
        if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles) {
                let allow = false;
                route.data.roles.forEach(element => {
                    if (currentUser.roles.includes(element)) {
                        allow = true;
                    }
                });

                if(!allow){
                    this.router.navigate(['/']);   
                }
                  return allow;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    */
}