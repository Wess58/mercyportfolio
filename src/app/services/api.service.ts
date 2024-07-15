import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://thewalkbymercymunyange.com';

  constructor(private httpClient: HttpClient) { }

  getPodcasts(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/podcasts.json');
  }
}
