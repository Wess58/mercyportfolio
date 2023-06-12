import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MediumService {

  constructor(private httpClient: HttpClient) { }


  getPosts(): Observable<any> {
    return this.httpClient.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@thewalkbymercymunyange");
  }

  // Discouragement At The Work Place
  // https://citizen-digital-cms-files.s3.amazonaws.com/86364/1324_sound_track_jt7iY.wav
}
