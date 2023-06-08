import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MediumService {

  constructor(
    private http: HttpClient
  ) { }

  getPosts(username: string): Observable<any> {
    return this.http.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@" + username);
  }
}
