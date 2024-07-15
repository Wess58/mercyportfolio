import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { style, animate, transition, trigger } from '@angular/animations';

import podcasts from "../../../jsons/podcasts.json";

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PodcastDetailComponent implements OnInit {

  podcasts: any = podcasts.podcasts;
  currentPodcast: any;
  currentPodcastIndex = 0;
  isCopied = false;
  otherPodcasts: any = [];
  animateAfterViewInit = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.podcasts.forEach((podcast: any, i: any) => {
      podcast.index = i;
    });

    this.currentPodcastIndex = +this.activatedRoute.snapshot.params['index'] ?? 0;
    this.getCurrentPodcast(this.currentPodcastIndex);


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateAfterViewInit = true;
    }, 200);
  }

  getCurrentPodcast(index: any): void {
    this.router.navigate(['/podcast', index]);
    this.currentPodcastIndex = +index;

    setTimeout(() => {

      this.currentPodcast = this.podcasts[this.currentPodcastIndex];
      const currentIndex = this.podcasts ?.length - this.currentPodcastIndex === 1 ? 0 : this.currentPodcastIndex + 1;

      this.otherPodcasts = [];
      this.otherPodcasts = this.podcasts.slice(currentIndex, currentIndex + 8);

      window.scroll(0, 0);
    }, 10);

  }

  shareOnWhatsapp(): any {
    const whatsappLink = this.sanitizer.bypassSecurityTrustUrl('whatsapp://send?text=' + window.location.href);
    return whatsappLink;
  }

  shareOnTwitter(): any {
    const link = 'https://twitter.com/intent/tweet?text=' + window.location.href;
    return link;
  }

  shareOnFacebook(): any {
    const link = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href;
    return link;
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href);
    this.isCopied = true;

    setTimeout(() => {
      this.isCopied = false;
    }, 1500);
  }

  play(): void {
    if (document.querySelector('iframe[src*="spotify.com/embed"]')) {
      const spotifyEmbedWindow: any = document.querySelector('iframe[src*="spotify.com/embed"]') as HTMLIFrameElement;
      spotifyEmbedWindow.contentWindow.postMessage({ command: 'toggle' }, '*');
    }
  }




}
