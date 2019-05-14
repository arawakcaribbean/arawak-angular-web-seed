import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './base/layout/layout.component';
import { FormTourComponent } from './web/tour/form-tour/form-tour.component';
import { SearchMapsComponent } from './web/place/search-maps/search-maps.component';
import { TourShowComponent } from './web/tour/tour-show/tour-show.component';
import { TourListComponent } from './web/tour/tour-list/tour-list.component';
import { NotFoundComponent } from './base/not-found/not-found.component';
import { FormClaimComponent } from './web/place/form-claim/form-claim.component';

const routes: Routes = [

  {path: '',component: LayoutComponent,},
  // { path: 'login', component: CallbackComponent, pathMatch: 'full' },
  {path: 'maps',component: SearchMapsComponent,},
  {path: 'build-tour',component: FormTourComponent,},
  {path: 'show-tour/:id',component: TourShowComponent,},
  {path: 'list-tour',component: TourListComponent,},
  {path: 'claim-place-form/:id',component: FormClaimComponent,},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

 
export class AppRoutingModule { }
