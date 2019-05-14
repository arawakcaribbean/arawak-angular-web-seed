import { BaseService } from '../base.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../user/authentication.service';
@Injectable({
    providedIn: 'root'
})
export class PlaceService {
    constructor(public _service: BaseService, public authService: AuthenticationService) { }

    getCountries(filter: string) {
        return this._service.get(`${environment.apiUrl}${environment.location}/countries/search?name=${filter}&page=${0}&size=${10000}`);
    }
    getResource(filter: string, country: string) {
        if (country) {
            return this._service.get(`${environment.apiUrl}${environment.playTour}/resource/search/by/country?query=${filter}&countryId=${country}`);
        } else {
            return this._service.get(`${environment.apiUrl}${environment.playTour}/resource/search?query=${filter}`);
        }
    }
    getResourceByID(id: string) {
        return this._service.get(`${environment.apiUrl}${environment.playTour}/resource/${id}`);
    }
    getResourceAvailable(countryId: string, startDate: any, endDate: any, onlybookable: boolean) {
        return this._service.get(`${environment.apiUrl}${environment.playTour}/resource/availables?countryId=${countryId}&startDate=${startDate}&endDate=${endDate}&onlybookable=${onlybookable}`);
    }


    createClaim(idResource: string, idCurrentOwner: string) {
        let model = {
            "idApp": environment.idApp,
            "idCurrentOwner": idCurrentOwner,
            "idResource": idResource,
            "idUserClaimer": (this.authService.currentUserValue) ? this.authService.currentUserValue.id : "-",
        }
        return this._service.post(`${environment.apiUrl}${environment.claim}/claims`, model);

    }

    saveClaim(model: any) {
        return this._service.post(`${environment.apiUrl}${environment.claim}/claimforms`, model);

    }

}