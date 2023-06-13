import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';

import podcasts from "../../../jsons/podcasts.json";

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
    trigger('fadeInGrow', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, marginTop: 40 }),
          stagger('150ms', [
            animate('600ms ease', style({ opacity: 1, marginTop: 0 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PodcastListComponent implements OnInit {

  podcasts: any = [];
  podcastLinks:any = podcasts.podcastLinks;


  constructor() { }

  ngOnInit(): void {
    window.scroll(0,0);


    setTimeout(() => {
      this.podcasts = podcasts.podcasts;
    }, 300);
  }

}
