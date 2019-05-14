import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { PublisherSubscribeService } from 'src/core/_events/publisher-subscribe.service';
import { RenderPointMessage, RenderRouteMessage } from 'src/core/_events/message';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Country } from 'src/core/_models/country';
import { PlaceService } from 'src/core/_services/placetour/place-service';
import { TourService } from 'src/core/_services/placetour/tour-service';
import { Tour } from 'src/core/_models/tour/tour';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';
import { BaseComponent } from 'src/core/_component/base-component';
import { ToastrService } from 'ngx-toastr';
import { I18NextService } from 'angular-i18next';
import { Globals } from 'src/core/_helpers/globals';
import { PageList } from 'src/core/_models/generic/page-list';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-tour',
  templateUrl: './form-tour.component.html',
  styleUrls: ['./form-tour.component.css']
})
export class FormTourComponent extends BaseComponent implements OnInit {
  hoveredDate: NgbDate;
  form: FormGroup


  isValid: boolean = true;
  fromDate: NgbDate;
  toDate: NgbDate;
  searchPoint: any;

  listCountry: Array<Country> = []
  loadingCountry: boolean

  listResourceTour: Array<any> = []

  constructor(
    public toastr: ToastrService,
    public i18n: I18NextService,
    public config: Globals,
    public _service: TourService,
    public _servicePlace: PlaceService,
    public route:Router,
    calendar: NgbCalendar,
    public pubsub: PublisherSubscribeService,
    public _authService: AuthenticationService
  ) {
    super(_authService, toastr, i18n, config);
    this.fromDate = calendar.getToday();
    //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


  ngOnInit() {
    this.instance.selectItem.subscribe(data => {
      this.form.get('country').setValue(data.item)
      this.pubsub.publish(RenderPointMessage, {
        point: data.item
      })
    })

    this.loadCountry();


    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      startDate: new FormControl('', Validators.required),
      endDDate: new FormControl('', Validators.required),
      country: new FormControl(null, Validators.required),
    });

    let dateString = this.fromDate.year + "/" + this.fromDate.month + "/" + this.fromDate.day
    this.form.get('startDate').setValue(dateString)
    this.form.controls.country.valueChanges.subscribe((selectedItem) => {
      const errors: ValidationErrors = {};
      if (!selectedItem.id) {
        errors.required = { message: this.trans('Country is required') };
        this.form.controls.country.setErrors(errors)
      }
    })
  }

  validDate: boolean = false
  onDateSelection(date: NgbDate) {
    this.validDate = true
    let dateString = this.fromDate.year + "/" + this.fromDate.month + "/" + this.fromDate.day
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;

      this.form.get('startDate').setValue(dateString)
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.form.get('endDDate').setValue(dateString)
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.form.get('startDate').setValue(dateString)
      this.form.get('endDDate').setValue(null)
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {

    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }



  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  formatter = (result: Country) => result.name;
  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.listCountry
        : this.listCountry.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  next: boolean = false
  onStep1Next($event) {
    this.next = true
  }
  onComplete($event) {
    let model: any = {     
      countryId: this.form.get('country').value.id,
      description: this.form.get('description').value,
      idApp: environment.idApp,
      idUser: (this._authService.currentUserValue.id)?this._authService.currentUserValue.id:"jasdhjdhkasj",
      name: this.form.get('name').value,
      participants: [],
      participantsCapacity: 0,
      tourPaths: this.listResourceTour,
    }

    this._service.create(model).subscribe(() => {
      this.displayMessage(this.trans('The playtour has been planned successfully'))
      this.route.navigate(['list-tour']);
    }, () => {
      this.showSnackBar('info',this.trans('The playtour could not be created because there are places registered in the tour that are reservable and do not have a previous reservation'))
      this.route.navigate(['list-tour']);
     })
    console.log(this.form)
    return false;
  }

  loadCountry() {
    this.loadingCountry = true;
    this._servicePlace.getCountries("").subscribe((list: PageList<Country>) => {
      this.listCountry = list.content;
      this.loadingCountry = false;
    }, () => {
      this.loadingCountry = false;
    })


  }

  openNav() {
    document.getElementById("mySidepanel").style.width = "450px";
  }

  /* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  waypoints: Array<any> = []
  onUpdateTour(tourList) {
    this.listResourceTour = []
    tourList.forEach(element => {
      this.listResourceTour.push(element.postData)
    });

   


  }

}




export const states: Array<Country> = [
  { latitude: 21.946872, longitude: -79.236672, code: '', timezones: [], id: '1', capital: '', name: 'Cuba' },
  { latitude: 18.151295, longitude: -77.319222, code: '', timezones: [], id: '2', capital: '', name: 'Jamaica' },
  { latitude: 18.606258, longitude: -70.106722, code: '', timezones: [], id: '3', capital: '', name: 'Dominicana' },
];
