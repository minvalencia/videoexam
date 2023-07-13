import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private endpoint = 'https://moviesdatabase.p.rapidapi.com';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '0b8f89c5a4mshcc009e25f7f49a1p165381jsnc4e731d3cf3e',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
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
