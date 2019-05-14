import { HttpErrorResponse } from "@angular/common/http"
import { I18NextService } from 'angular-i18next';
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../_helpers/globals';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../_services/user/authentication.service';

export class BaseComponent {
    staticUrl = environment.staticUrl
    isLogged: boolean
    constructor(
        public authService: AuthenticationService,
        public toastr: ToastrService,
        public i18n: I18NextService,
        public config: Globals,

    ) {

        this.isLogged = (authService.currentUserValue) ? true : false
    }
    protected displayMessage(error: string) {
        this.showSnackBar('success', error)
    }
    protected displayError(error: HttpErrorResponse) {
        let errorMessage = 'Ha ocurrido un error, por favor contacte con los administradores, disculpe las molestias ocasionadas.'
        if (error.status === 404) {
            errorMessage = 'No se ha podido establecer conexion con el servidor, contacte a los administradores'
        }
        this.showSnackBar('error', errorMessage)

    }
    protected showSnackBar(type: string, message: string) {
        if (type == 'error')
            this.toastr.error(message, 'Error');
        if (type == 'success')
            this.toastr.success(message, 'En hora buena');
        if (type == 'info')
            this.toastr.info(message, 'Atention!');
    }

    protected trans(text: string) {
        return this.i18n.t(text)
    }

    protected isEmphy(data: any) {
        if (data)
            return false;
        return true;
    }
}
