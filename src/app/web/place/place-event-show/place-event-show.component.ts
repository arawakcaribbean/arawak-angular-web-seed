import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/core/_component/base-component';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'src/core/_helpers/globals';
import { I18NextService } from 'angular-i18next';
import { Events } from 'src/core/_models/entity/event';
import { PlaceService } from 'src/core/_services/placetour/place-service';
import { AuthenticationService } from 'src/core/_services/user/authentication.service';
import { ReviewService } from 'src/core/_services/placetour/review-service';

@Component({
  selector: 'place-event-show',
  templateUrl: './place-event-show.component.html',
  styleUrls: ['./place-event-show.component.css']
})
export class PlaceEventShowComponent  extends BaseComponent implements OnInit {
  data: Events
  isLoading: boolean
  isLoadingClain: boolean
  @Input() resourceID: string
  @Input() onlyView: boolean

  hasLike: boolean = false;
  hasDisLike: boolean = false;
  likes: number = 0
  disLikes: number = 0
  idLike: string
  rate: number = 0

  public lottieLikeConfig: Object;
  public lottieDisLikeConfig: Object;
  constructor(public toastr: ToastrService,
    public authService: AuthenticationService,
    public _reviewService: ReviewService,
    public _config: Globals,
    public _service: PlaceService,
    public i18n: I18NextService) {
    super(authService, toastr, i18n, _config);

    this.lottieLikeConfig = {
      path: 'assets/json/like-button.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };

    this.lottieDisLikeConfig = {
      path: 'assets/json/dislike-button.json',
      renderer: 'canvas',
      autoplay: false,
      loop: false
    };
  }
  private animLike: any;
  handleLikeAnimation(anim: any) {
    this.animLike = anim;
  }

  private animDisLike: any;
  handleDisLikeAnimation(anim: any) {
    this.animDisLike = anim;
  }

  onRate(rateEvent) {
    if (rateEvent) {
      if (this.isLogged) {
        this.createRate(rateEvent)
      } else {
        this.showSnackBar('info', this.trans('This operation requires authentication on the platform'))
      }
    }
  }


  onLike() {
    if (this.isLogged) {
      if (this.hasLike) {
        this.animLike.stop();
        this.hasLike = false
        this.likes--
        this.deleteLike()
      } else {
        this.animLike.play();
        this.animDisLike.stop();
        this.hasLike = true
        if (this.hasDisLike) {
          this.hasDisLike = false
          this.disLikes--
        }
        this.likes++
        this.createLike("LIKE")
      }
    } else {
      this.showSnackBar('info', this.trans('This operation requires authentication on the platform'))
    }
  }

  onDisLike() {
    if (this.isLogged) {
      if (this.hasDisLike) {
        this.animDisLike.stop();
        this.hasDisLike = false
        this.disLikes--
        this.deleteLike()
      } else {
        this.animDisLike.play();
        this.animLike.stop();
        this.hasDisLike = true
        if (this.hasLike) {
          this.hasLike = false
          this.likes--
        }
        this.disLikes++
        this.createLike("ANGRY")
      }
    } else {
      this.showSnackBar('info', this.trans('This operation requires authentication on the platform'))
    }
  }

  createLike(value) {
    this._reviewService.createLike(this.resourceID, value).subscribe((data) => {
      console.log(data)
    });
  }
  createRate(value) {
    this._reviewService.createRate(this.resourceID, value).subscribe((data) => {
      this.iRateThisResource = true
    });
  }

  deleteLike() {
    this._reviewService.removeLike(this.idLike).subscribe((data) => {
      console.log(data)
    });
  }
  loadMylike() {
    this._reviewService.getLikeByUserByResource(this.resourceID).subscribe((data) => {

      this.idLike = data.id

      setTimeout(() => {
        if (data.value == "LIKE") {
          this.animLike.play();
          this.hasLike = true
          this.hasDisLike = false
        }
        if (data.value == "ANGRY") {
          this.animDisLike.play();
          this.hasLike = false
          this.hasDisLike = true
        }
      }, 100)

    })
  }
  iRateThisResource: boolean = false
  loadMyRate() {
    this._reviewService.getRateByUserByResource(this.resourceID).subscribe((rate) => {
      this.iRateThisResource = false
      this.rate = rate.value

    });
  }
  loadRate() {
    this._reviewService.getRateByResource(this.resourceID).subscribe((rate) => {
      this.rate = rate
    });
  }

  loadLikes() {
    this._reviewService.getLikesByResource(this.resourceID).subscribe((data) => {
      this.likes = data.statesValues.find((data => data.state == "LIKE")).quantity
      this.disLikes = data.statesValues.find((data => data.state == "ANGRY")).quantity
      this.likes = 0;
      this.disLikes = 0;
      if (data.statesValues.find((data => data.state == "LIKE"))) {
        this.likes = data.statesValues.find((data => data.state == "LIKE")).quantity
      }
      if (data.statesValues.find((data => data.state == "ANGRY"))) {
        this.disLikes = data.statesValues.find((data => data.state == "ANGRY")).quantity
      }
    })
  }



  ngOnInit() {

    this.load()
    if (this.isLogged) {
      this.loadMylike()
      this.loadMyRate()

    } else {
      this.loadRate()
      setTimeout(() => {
        this.animLike.play()
        this.animDisLike.play()
      },200)
    }
    this.loadLikes()
  }
  listTypes = []
  listImages = []
  load() {
    this.isLoading = true
    this._service.getResourceByID(this.resourceID).subscribe((dataResponse) => {
      this.data = dataResponse
      this.data.images.forEach(element => {
        this.listImages.push(this.staticUrl + element)
      });
      dataResponse.type.forEach(element => {
        let item = {
          text: element,
          image: "assets/icon/labels/Icons/" + element + ".png"
        }
        this.listTypes.push(item)
      });
      this.isLoading = false
    })
  }



  goClain() {
    this.isLoadingClain = true
    this._service.createClaim(this.data.id,this.data.ownerId).subscribe(()=>{
      this.showSnackBar('success',"The claim has been registered, we will send you an email with the details of the request if it proceeds.")
      this.isLoadingClain = false
    },()=>{
      this.showSnackBar('error',"You have already sent a claim request for this place")

      this.isLoadingClain = false
    })   
   }

  yes = this.trans('Yes')






}