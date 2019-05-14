import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';
import { AccountUser } from 'src/core/_models/user';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<AccountUser>;
    public currentUser: Observable<AccountUser>;
    private endPointSignin = `/Account/signin`;
    private endPointSignout = `/Account/signout`;

    constructor(private http: BaseService) {
        this.currentUserSubject = new BehaviorSubject<AccountUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AccountUser {
        return this.currentUserSubject.value;
    }

    public checkRole(rol: string): boolean {
        return this.currentUserSubject.value.roles.includes(rol);
    }

    public isLogged() {
        if (this.currentUserSubject.value)
            return true;
        return false
    }





    updateUser(name: string, lastname: string) {
        let user: AccountUser = JSON.parse(localStorage.getItem('currentUser'));
        user.display_name = name + " " + lastname;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}