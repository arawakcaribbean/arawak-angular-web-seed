import { Injectable, Type } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherSubscribeService {
  channels: Channels = new Map<Type<any>, Subject<any>>()
  subscribe<T>(type: Type<T>): Observable<T> {
    if (!this.channels.has(type)) {
      this.channels.set(type, new Subject<T>())
    }
    return this.channels.get(type).asObservable()
  }
  publish<T>(type: Type<T>, payload: T) {
    this.channels.get(type).next(payload)
  }
}
type Channels = Map<Type<any>, Subject<any>>