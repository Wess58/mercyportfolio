import { Component, OnInit } from '@angular/core';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.getCurrentPodcast();
  }

  getCurrentPodcast(): void {
    setTimeout(() => {
      this.currentPodcastIndex = this.activatedRoute.snapshot.params['index'] ?? 0;

      this.currentPodcast = this.podcasts[this.currentPodcastIndex];

    }, 1);
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


}
