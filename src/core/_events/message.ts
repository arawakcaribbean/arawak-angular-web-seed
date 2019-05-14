import { Country } from '../_models/country';

export class RenderPointMessage{
    point: Country
}

export class RenderRouteMessage{
    waypoints: Array<any>
}

