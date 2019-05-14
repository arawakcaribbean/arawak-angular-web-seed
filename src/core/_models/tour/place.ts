import { Country } from '../country';

export interface Place {
    endDate: string
    id: string
    idBooking: Booking
    idLocation: Location
    idResource: {}
    numOrder: number
    startDate: string
    tourPathStatus: string
}


export interface Bookable {
    createdAt: string
    dateend: string
    datestart: string
    id: string
    idapp: string
    idlocation: string
    idrate: string
    idresource: string
    iduser: string
    isenabled: boolean
    updatedAt: string
}
export interface Booking {
    bookable: Bookable
    createdAt: string
    dateend: string
    datestart: string
    id: string
    idapp: string
    idresource: string
    iduser: string
    status: string
    updatedAt: string
}


export interface Location {
    appId: string
    city: string
    country: Country
    email: string
    fax: string
    id: string
    location: any
    name: string
    parish: string
    phoneNumbers: Array<string>
    postalCode: string
    resourceId: string
    state: string
    street: string
    timeZone: string
}
