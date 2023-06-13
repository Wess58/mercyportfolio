import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';

import content from "../../jsons/content.json";
import podcasts from "../../jsons/podcasts.json";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
          stagger('120ms', [
            animate('500ms ease', style({ opacity: 1, marginTop: 0 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  content: any = content.landing;
  companies: any = content.companies;
  services: any = content.services;
  podcasts: any = podcasts.podcasts;


  constructor(
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      // this.services = content.services;
    }, 500);
  }

}
