// import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class BaseService {

  headers: HttpHeaders

  constructor(private _http: HttpClient) {
    this.setHeaders()
  }

  get<T>(url: string): Observable<any> {
    return this._http.get<any>(url, { headers: this.headers })
  }

  post<T>(url: string, data: T): Observable<any> {
    const jsonData = JSON.stringify(data)
    return this._http.post(url, jsonData, { headers: this.headers })
  }

  put<T>(url: string, data: T): Observable<any> {
    const jsonData = JSON.stringify(data)
    return this._http.put(url, jsonData, { headers: this.headers })
  }

  delete<T>(url: string): Observable<any> {
    return this._http.delete(url, { headers: this.headers })
  }

  deleteMulti<T>(url: string, data: T): Observable<any> {    
    const options = {
      headers: this.headers,
      body: data
    }
    return this._http.delete(url, options)
  }



  private setHeaders() {
    this.headers = new HttpHeaders()
    this.headers.set('Accept', 'application/json')
    this.headers = this.headers.set('Content-Type', 'application/json')
  }
}
