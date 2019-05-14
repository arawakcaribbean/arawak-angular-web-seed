import { ResourceType } from './resourceType';
import { Resource } from './resource';

export class Events extends Resource {
  eventTime: string
  startTime: string
  endTime: string
}