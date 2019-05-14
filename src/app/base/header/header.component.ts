import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filter: string = ""
  constructor(private route: Router) { }

  ngOnInit() {
   
  }

  goFormTour() {
    this.route.navigate(['build-tour'])
  }

  goRedirect(eventClick) {
   
    this.route.navigate(['maps'], {
      queryParams: {
        filter: this.filter,
        eventClick:eventClick
      }
    })

  }

}
