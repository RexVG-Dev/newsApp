import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { TopHeadLineModel } from '../../core/models/top-head-line-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  contry: 'us',
  apiKey: apiKey,
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headLinesPage = 0;

  actualCategory = '';
  pageCategory = 0;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  /*getTopHeadLines(){
    return this.http.get<TopHeadLineModel>(`${this.path}`);
  }*/

  getTopHeadLines(country?): Observable<TopHeadLineModel>{
    // return this.apiService.get(`${this.path}`).pipe(map( response => response));

    this.headLinesPage++;
    return this.apiService.get(`${apiUrl}/top-headlines`,
      {country: 'mx', apiKey: `${apiKey}`, page:`${this.headLinesPage}`}).pipe(map( response => response));
  }

  getTopCategory( category: string): Observable<TopHeadLineModel>{

    if(this.actualCategory === category){
      this.pageCategory++;
    } else {
      this.pageCategory = 1;
      this.actualCategory = category;
    }
    return this.apiService.get(`${apiUrl}/top-headlines`,
      { country: 'mx', category: category, apiKey: `${apiKey}`, page:`${this.pageCategory}`}).pipe(map( response => response));
  }
}
