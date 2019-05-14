import { BaseService } from '../base.service';
import { environment } from 'src/environments/environment';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';


import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of as observabeOf, Subject } from 'rxjs';
import { Tour } from '../../_models/tour/tour';
import { SortDirection } from '../../_directive/sortable.directive';
import { DecimalPipe } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { AuthenticationService } from '../user/authentication.service';


interface SearchResult {
    tour: Tour[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(tourList: Tour[], column: string, direction: string): Tour[] {
    if (direction === '') {
        return tourList;
    } else {
        return [...tourList].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(tour: Tour, term: string, pipe: PipeTransform) {
    return tour.name.toLowerCase().includes(term)
    // || pipe.transform(tour.name).includes(term)

}

@Injectable({ providedIn: 'root' })
export class TourService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _tourList$ = new BehaviorSubject<Tour[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe, private service: BaseService,private auth: AuthenticationService,public keycloakAngular: KeycloakService,) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._tourList$.next(result.content);
            this._total$.next(result.countPages);
        });

        this._search$.next();
    }

    get tourList$() { return this._tourList$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<any> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let tourList = sort(TOURS, sortColumn, sortDirection);


        // 2. filter
        tourList = tourList.filter(tour => matches(tour, searchTerm, this.pipe));
        const total = tourList.length;

        // 3. paginate
        tourList = tourList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        let id = this.auth.currentUserValue.id
        console.log(id);
        let url = environment.apiUrl + environment.playTour + "/tours/noparticipant/"+id+"?page="+page+"&size="+pageSize
        return this.service.get(url)


         
    }


    create(model: Tour) {
        let url = environment.apiUrl + environment.playTour + "/tours"
        return this.service.post(url, model)
    }

    get(id:string) {
        let url = environment.apiUrl + environment.playTour + "/tours/"+id
        return this.service.get(url)
    }
}



export const TOURS: Tour[] = [
    {
        id: "1",
        countryId: "Cuba",
        description: "Tour1",
        idApp: "skdjf23u0423",
        idUser: "skdjf23u0423",
        name: "Tour1",
        participants: [],
        participantsCapacity: 0,
        tourPaths: []
    },
    {
        id: "1",
        countryId: "Cuba",
        description: "Tour1",
        idApp: "skdjf23u0423",
        idUser: "skdjf23u0423",
        name: "Tour1",
        participants: [],
        participantsCapacity: 0,
        tourPaths: []
    },
    {
        id: "1",
        countryId: "Cuba",
        description: "Tour1",
        idApp: "skdjf23u0423",
        idUser: "skdjf23u0423",
        name: "Tour1",
        participants: [],
        participantsCapacity: 0,
        tourPaths: []
    },
    {
        id: "1",
        countryId: "Cuba",
        description: "Tour1",
        idApp: "skdjf23u0423",
        idUser: "skdjf23u0423",
        name: "Tour1",
        participants: [],
        participantsCapacity: 0,
        tourPaths: []
    },
    {
        id: "1",
        countryId: "Cuba",
        description: "Tour1",
        idApp: "skdjf23u0423",
        idUser: "skdjf23u0423",
        name: "Tour1",
        participants: [],
        participantsCapacity: 0,
        tourPaths: []
    },

]