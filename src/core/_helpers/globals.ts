import { Injectable } from "@angular/core";
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { I18NextService } from 'angular-i18next';


@Injectable({
    providedIn: 'root'
})
export class Globals {
    constructor(  public i18n: I18NextService){ }
    
    //Languages
    public languages =  ['es', 'en'];
    public default_languages =  'es';
    
    //Table Config    
    public pageSize = 10;
    public pageSizeOptions =[5, 10, 20];
    //Spinner
    public spinner={animationType: ngxLoadingAnimationTypes.threeBounce,
                    primaryColour:"#0179c1",
                    secondaryColour:"#0179c1",
                    tertiaryColour:"#0179c1",
                    backdropBackgroundColour:"rgba(0, 0, 0, 0.7)"}

    
    
    
    
    
     //Table String
     public empthyTable= this.i18n.t("No existen registros para mostrar");

     
}