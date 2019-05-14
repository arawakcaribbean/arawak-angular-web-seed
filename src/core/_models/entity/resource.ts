import { ResourceType } from './resourceType';
import { Country } from '../country';

export class Resource {
  id: string
  name: string
  description: string
  type: Array<ResourceType>
  location: Location
  __type: string
  country: Country
  street: string
  city: string
  state: string
  community: string
  region: string
  timeZone: Array<string>
  phoneNumbers: Array<string>
  fax: string
  email: string  
  ownerId: string
  tourGuideOperator: string
  bookable: string
  mainImage: string
  images: Array<string>
  createdAt: string
  updatedAt: string
  deletedAt: string
  deleted: boolean
  active: boolean
  bookeable: boolean


}



export class Location {
  lat: number
  lon: number
}

export class ResourceLike{
  
    resourceId: string
    statesValues: Array<ResourceLikeValue>
  
}
export class ResourceLikeValue{  
      quantity: number
      state: string  
}
