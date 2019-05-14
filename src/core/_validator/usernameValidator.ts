import { AbstractControl } from '@angular/forms';
import matches from 'validator/lib/matches';

export function usernameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    console.log(matches(control.value,"/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/"))
    if (matches(control.value,"/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/")) {
        return { 'username': true };
    }
    return null;
}