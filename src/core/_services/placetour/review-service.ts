import { BaseService } from '../base.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../user/authentication.service';
import { ResourceLike } from 'src/core/_models/entity/resource';
@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    constructor(public _service: BaseService,
        private _serviceAuth: AuthenticationService
    ) {

     }


    //LIKE
    createLike(resourceID: string,value:string) {
        let model = {
            date: new Date(),
            idApp: environment.idApp,
            idResource: resourceID,
            idUser: (this._serviceAuth.currentUserValue)?this._serviceAuth.currentUserValue.id:"--",
            value: value
        }
        return this._service.post(`${environment.apiUrl}${environment.reviews}/states`, model);
    }
    removeLike(id: string) {
        return this._service.delete(`${environment.apiUrl}${environment.reviews}/states/${id}`);
    }

    getLikesByResource(resourceID: string) {
        return this._service.get(`${environment.apiUrl}${environment.reviews}/states/resource/${resourceID}`);
    }

    getLikeByUserByResource(resourceID: string) {
        let idUser = (this._serviceAuth.currentUserValue)?this._serviceAuth.currentUserValue.id:"--"
        return this._service.get(`${environment.apiUrl}${environment.reviews}/states/resource/${resourceID}/user/${idUser}`);
    }


    //RATE
    createRate(resourceID: string,value:number) {
        let model = {
            date: new Date(),
            idApp: environment.idApp,
            idResource: resourceID,
            idUser: (this._serviceAuth.currentUserValue)?this._serviceAuth.currentUserValue.id:"--",
            value: value
        }
        return this._service.post(`${environment.apiUrl}${environment.reviews}/evaluations`, model);
    }

    removeRate(id: string) {
        return this._service.delete(`${environment.apiUrl}${environment.reviews}/evaluations/${id}`);
    }
    getRateByResource(resourceID: string) {
        return this._service.get(`${environment.apiUrl}${environment.reviews}/evaluations/resource/${resourceID}`);
    }

    getRateByUserByResource(resourceID: string) {
        let idUser = (this._serviceAuth.currentUserValue)?this._serviceAuth.currentUserValue.id:"--"
        return this._service.get(`${environment.apiUrl}${environment.reviews}/evaluations/resource/${resourceID}/user/${idUser}`);
    }



}


