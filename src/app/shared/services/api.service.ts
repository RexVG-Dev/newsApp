import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { createHttpParams } from './params-builder';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: any){
    return throwError(error.error);
  }

  get(path: string, params: any= {}): Observable<any>{
    params = createHttpParams(params || {});
    return this.http.get(`${path}`, {params})
      .pipe(catchError(this.formatErrors));
  }

  put(path:string, body: Object = {}): Observable<any> {
    return this.http.put(`${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any>{
    return this.http.post(`${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(`${path}`, {params})
      .pipe(catchError(this.formatErrors));
  }
}
