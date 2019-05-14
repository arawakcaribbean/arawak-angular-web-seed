import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  classHome: string = "navbar navbar-expand-lg navbar-dark fixed-top"
  classRouting: string = "navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink"
  public href: string = "";
  isLogged:boolean

  @ViewChild("mainNav") nav: ElementRef
  constructor(@Inject(DOCUMENT) private document: any, private auth:AuthenticationService,  protected keycloakAngular: KeycloakService, private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })

  
    
  }

 

  public login() {
    this.keycloakAngular.login()
  }

  public logoff() {
    localStorage.removeItem('currentUser');
    this.keycloakAngular.logout().then(()=>{
    })
  }

   



  ngOnInit() {
    this.href = window.location.pathname;
    if (this.href == "/")
      this.nav.nativeElement.className = this.classHome
    else
      this.nav.nativeElement.className = this.classRouting

      this.keycloakAngular.isLoggedIn().then((isLogged)=>{
        this.isLogged=isLogged
      })


  }

  navigationInterceptor(event: RouterEvent): void {
   
    if (event instanceof NavigationEnd) {     
      let href = window.location.pathname;
      if (href == "/") {
        this.nav.nativeElement.className = this.classHome
      } else {
        this.nav.nativeElement.className = this.classRouting
      }
    }   
  }

  goListTour(){
    this.router.navigate(['list-tour'])
  }


}
