import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/core/_component/base-component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { constructor } from 'q';
import { ToastrService } from 'ngx-toastr';
import { i18n } from '@angular/core/src/render3';
import { I18NextService } from 'angular-i18next';
import { config } from 'process';
import { Globals } from 'src/core/_helpers/globals';
import { TourService } from 'src/core/_services/placetour/tour-service';
import { PlaceService } from 'src/core/_services/placetour/place-service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { PublisherSubscribeService } from 'src/core/_events/publisher-subscribe.service';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';
import * as moment from 'moment'
import { ParamMap, Router, Route, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form-claim',
  templateUrl: './form-claim.component.html',
  styleUrls: ['./form-claim.component.css']
})
export class FormClaimComponent extends BaseComponent implements OnInit {

  form: FormGroup
  idClaimer: string = ""
  constructor(
    public toastr: ToastrService,
    public i18n: I18NextService,
    public config: Globals,
    public route: ActivatedRoute,
    public router: Router,
    public _service: TourService,
    public _servicePlace: PlaceService,
    public pubsub: PublisherSubscribeService,
    public _authService: AuthenticationService
  ) {
    super(_authService, toastr, i18n, config);

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has("id")) {
        this.idClaimer = params.get("id")
      }
    })

    this.form = new FormGroup({
      addressClaimer: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      emailClaimer: new FormControl('', [Validators.required, Validators.email]),
      fullNameClaimer: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      idClaimer: new FormControl(this.idClaimer, [Validators.required, Validators.maxLength(100)]),
      claimedAt: new FormControl(moment().toISOString(), [Validators.required, Validators.maxLength(100)]),
      idUserClaimer: new FormControl(this.authService.currentUserValue.id, [Validators.required, Validators.maxLength(100)]),
      imageEvidence: new FormControl('', [Validators.required]),
      phoneClaimer: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    });
  }
  isSubmit: boolean = false
  submit() {
    this.isSubmit = true
    this._servicePlace.saveClaim(this.form.value).subscribe(() => {
      this.isSubmit = false
      this.showSnackBar("success", this.trans('Successfully registered information'))
      this.router.navigate(['/'])
    }, (error) => {
      if(error.status==410){
        this.showSnackBar("error", this.trans('There is no claim with the requested ticker'))
      }
      this.isSubmit = false
    })
  }
}