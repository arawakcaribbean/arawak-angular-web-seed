import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PageList } from 'src/core/_models/generic/page-list';
import { User } from 'src/core/_models/user';
import { Roles } from 'src/core/_models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _service: BaseService) { }

  list(sort: string, order: string, page: number, pageSize: number, filter: string, only_actor: boolean) {
    let d = (order == "desc");
    let r = (only_actor) ? "ACTOR" : ""
    return this._service.get<PageList<User>>(`${environment.apiUrl}/Users?p=${page}&i=${pageSize}&s=${filter}&o=${sort}&d=${d}&r=${r}`)
      .pipe(map(pageListUser => {
        return pageListUser;
      }));
  }

  filter( filter: string) {
    let r ="REPORT"
    return this._service.get<PageList<User>>(`${environment.apiUrl}/Users?p=${1}&i=${50}&s=${filter}&r=${r}`)
      .pipe(map(pageListUser => {
        return pageListUser;
      }));
  }
  filterActor( filter: string) {
    let r ="ACTOR"
    return this._service.get<PageList<User>>(`${environment.apiUrl}/Users?p=${1}&i=${50}&s=${filter}&r=${r}`)
      .pipe(map(pageListUser => {
        return pageListUser;
      }));
  }

  create(model:User){
    return this._service.post(`${environment.apiUrl}/Users`,model);
  }
  update(id:string,model:User){
    return this._service.put(`${environment.apiUrl}/Users/${id}`,model);
  }  
  delete(id:string){
    return this._service.delete(`${environment.apiUrl}/Users/${id}`);
  }
  deleteMulti(id:Array<string>){
    return this._service.deleteMulti(`${environment.apiUrl}/Users`,id);
  }
  get(id:string){
    return this._service.get(`${environment.apiUrl}/Users/${id}`);
  }



  getProfile(){
    return this._service.get(`${environment.apiUrl}/Account`);
  }

  updateProfile(model:User){
    return this._service.put(`${environment.apiUrl}/Account`,model);
  }

  reset(id:string,model:User){
    return this._service.put(`${environment.apiUrl}/Users/${id}/reset`,model);
  } 
  roles(filter: string) {
    let search = (filter!="")?`?name=${filter}`:``
    return this._service.get<Array<Roles>>(`${environment.apiUrl}/Roles${search}`)
      .pipe(map(arrRole => {
        return arrRole;
      }));
  }
}
