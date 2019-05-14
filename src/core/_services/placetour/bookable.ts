import { BaseService } from '../base.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../user/authentication.service';
@Injectable({
    providedIn: 'root'
})
export class BookableService {
    constructor(public _service: BaseService, public authService: AuthenticationService) { }

    resourceIsBookable(resourceID: string, startdate: string, enddate: string) {
        return this._service.get(`${environment.apiUrl}${environment.booking}/bookables/${resourceID}/${startdate}/${enddate}`);
    }

    createBooking(bookableID: string, startDate: string, endDate: string, resourceID: string) {
        let model = {
            "bookable": bookableID,
            "dateend": endDate,
            "datestart": startDate,
            "idapp": environment.idApp,
            "idresource": resourceID,
            "iduser": (this.authService.currentUserValue) ? this.authService.currentUserValue.id : "-",
            "status": "CREATED"
        }
        return this._service.post(`${environment.apiUrl}${environment.booking}/bookings`, model);
    }

}