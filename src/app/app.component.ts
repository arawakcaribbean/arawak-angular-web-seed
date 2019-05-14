import { Component, OnInit, Inject, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  showHeader: boolean = true
  @ViewChild("mainNav") nav: ElementRef

  ngOnInit(): void {
    let href = window.location.pathname;
    if (href == "/") {
      this.showHeader = true
    } else {
      this.showHeader = false
    }
    
    
    this.keycloakAngular.isLoggedIn().then((data) => {
      
      if (data) {
        this.keycloakAngular.loadUserProfile().then((data) => {
          data = Object.assign(data, { id: data.username })
          localStorage.setItem('currentUser', JSON.stringify(data));
        });
      }

    })



  }

  loading = true
  constructor(
    private userService: AuthenticationService,
    @Inject(DOCUMENT) private document: any, private router: Router,private auth:AuthenticationService, private keycloakAngular: KeycloakService) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })


  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationEnd) {
      let href = window.location.pathname;
      if (href == "/") {
        this.showHeader = true
      } else {
        this.showHeader = false
      }
    }

  }
}
