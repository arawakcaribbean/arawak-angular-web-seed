import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgTableEmpthyComponent } from './msg-table-empthy/msg-table-empthy.component';
 
 
import { NgxLoadingModule } from 'ngx-loading';
import { I18NextModule } from 'angular-i18next';
@NgModule({
  declarations: [
    MsgTableEmpthyComponent,
   
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({}),
    I18NextModule.forRoot(),

  ],
  exports:[
    MsgTableEmpthyComponent,
   
   ]
})
export class ShareModule { }
