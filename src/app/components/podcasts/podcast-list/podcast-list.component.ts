import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';

import podcasts from "../../../jsons/podcasts.json";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ]),
    // trigger('fadeInGrow', [
    //   transition(':enter', [
    //     query(':enter', [
    //       style({ opacity: 0, marginTop: 40 }),
    //       stagger('150ms', [
    //         animate('600ms ease', style({ opacity: 1, marginTop: 0 }))
    //       ])
    //     ], { optional: true })
    //   ])
    // ])
    trigger('fadeInGrow', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            stagger('25ms', [
              animate('500ms', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]
})
export class PodcastListComponent implements OnInit {

  podcasts: any = [];
  podcastLinks: any = podcasts.podcastLinks;
  currentPodcast: any;
  recentPodcasts: any = [];
  recentPodcastsIds: any = [];
  loading = false;


  constructor(private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 10);

    this.podcasts = podcasts.podcasts;
    this.getRecentsFromLocal();

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }


  getRecentsFromLocal(): void {
    this.currentPodcast = this.podcasts[JSON.parse(localStorage.getItem('pdcts') ?? '0')];
    this.currentPodcast.index = JSON.parse(localStorage.getItem('pdcts') ?? '0');
  }

  play(index: any): void {
    this.currentPodcast.isPlaying = false;
    this.currentPodcast = this.podcasts[index];
    this.currentPodcast.index = index;
    localStorage.setItem('pdcts',index);


    setTimeout(() => {
      this.currentPodcast.isPlaying = true;
      if (document.querySelector('iframe[src*="spotify.com/embed"]')) {
        const spotifyEmbedWindow: any = document.querySelector('iframe[src*="spotify.com/embed"]') as HTMLIFrameElement;
        spotifyEmbedWindow.contentWindow.postMessage({ command: 'toggle' }, '*');
      }
    }, 2000);
  }

  pause():void{
    this.currentPodcast.isPlaying = false;
    if (document.querySelector('iframe[src*="spotify.com/embed"]')) {
      const spotifyEmbedWindow: any = document.querySelector('iframe[src*="spotify.com/embed"]') as HTMLIFrameElement;
      spotifyEmbedWindow.contentWindow.postMessage({ command: 'toggle' }, '*');
    }
  }

}
