import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

    URL_API: string = "http://localhost:8080";

    constructor(protected http: HttpClient) {}

    private formatErrors(error: any) {
      return throwError(error);
    }
  
    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
      return this.http.get(`${this.URL_API}${path}`, { params });
    }
  
    put(path: string, body: Object = {}): Observable<any> {
      return this.http
        .put(`${this.URL_API}${path}`, JSON.stringify(body))
        .pipe(catchError(this.formatErrors));
    }
  
    post(path: string, body: Object = {}, options?: any): Observable<any> {
      return this.http.post(`${this.URL_API}${path}`, body, options);
    }
  
    delete(path: string): Observable<any> {
      return this.http
        .delete(`${this.URL_API}${path}`)
        .pipe(catchError(this.formatErrors));
    }
}
