import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  backendApiURL = 'https://api.tvmaze.com/';

  constructor(private http: HttpClient) { 
  }

  getAllTVSeries(): Observable<any> {
    return this.http.get(`${this.backendApiURL}shows?page=1`);
  }

  
  searchSeries(searchText: string): Observable<any> {
    return this.http.get(`${this.backendApiURL}search/shows?q=${searchText}`);
  }

  getSeriesDetails(id: number): Observable<any> {
    return this.http.get(`${this.backendApiURL}shows/${id}`);
  }

  
  getSeriesCast(id: number): Observable<any> {
    return this.http.get(`${this.backendApiURL}shows/${id}/cast`);
  }

  getSeriesEpisodes(id: number): Observable<any> {
    return this.http.get(`${this.backendApiURL}shows/${id}/episodes`); 
  }
}
