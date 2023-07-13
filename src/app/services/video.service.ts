import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/.environment';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private endpoint = 'https://moviesdatabase.p.rapidapi.com';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.apiKey,
    'X-RapidAPI-Host': environment.apiHost
  });

  constructor(private http: HttpClient) {}

  getVideos(url: string): Observable<any> {
    return this.http.get(this.endpoint + url, { headers: this.headers });
  }

  getMoreVideos(url: string): Observable<any> {
    return this.http.get(this.endpoint + url, { headers: this.headers});
  }

  getVideoById(id: string): Observable<any> {
    const url = `${this.endpoint}/titles/${id}`;
    return this.http.get(url, { headers: this.headers });
  }
}
