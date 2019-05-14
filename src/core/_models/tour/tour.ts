import { Place } from './place';

export interface Tour {
    id: string,
    countryId: string,
    description: string,
    idApp: string,
    idUser: string,
    name: string,
    participants: Array<string>,
    participantsCapacity: 0,
    tourPaths: Array<Place>,
}