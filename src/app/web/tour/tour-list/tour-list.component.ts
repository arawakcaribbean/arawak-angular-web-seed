import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/core/_models/country';
import { NgbdSortableHeader, SortEvent } from 'src/core/_directive/sortable.directive';
import { TourService } from 'src/core/_services/placetour/tour-service';
import { BaseComponent } from 'src/core/_component/base-component';
import { ToastrService } from 'ngx-toastr';
import { MapsService } from 'src/core/_maps/maps-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/core/_helpers/globals';
import { I18NextService } from 'angular-i18next';
import { Tour } from 'src/core/_models/tour/tour';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';



@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css'],
  providers: [TourService]
})
export class TourListComponent extends BaseComponent {
  tourList$: Observable<Tour[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: TourService,
    public toastr: ToastrService,
    public _serviceMap: MapsService,
    public route: ActivatedRoute,
    public router: Router,
    public _config: Globals,
    public ref: ElementRef,
    public i18n: I18NextService
    ,public _authService: AuthenticationService
    ) {
    super(_authService,toastr, i18n, _config);

    this.tourList$ = service.tourList$;
    this.total$ = service.total$;
    

  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  show(id:string){
      this.router.navigate(['show-tour/'+id]);
  }

}