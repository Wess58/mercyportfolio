import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import content from "../../jsons/content.json";
import podcasts from "../../jsons/podcasts.json";

import { MediumService } from "../../services/medium.service";


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
  blogs: any = [];


  constructor(
    private sanitizer: DomSanitizer,
    private mediumService: MediumService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.getAllPosts();

    setTimeout(() => {
      // this.services = content.services;
    }, 500);

  }

  getAllPosts(): void {
    this.mediumService.getPosts().subscribe(
      (res: any) => {

        this.blogs = res.items;
        this.blogs.forEach((blog: any) => {
          blog.categories = this.concatCategoryStrings(blog.categories);
          blog.searchTerms = blog.title.toLowerCase() + ' ' + blog.categories.toLowerCase();
          const splitGuid = blog.guid.split('/');
          blog.localGuid = splitGuid[splitGuid.length - 1];
          // blog.pubDate = moment(blog.pubDate).format('LL');
          // console.log(this.blogs);
          // console.log(moment(blog.pubDate).format('LL'));
        });
        // this.blogs = Array(5).fill(res.items[0]);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  toBlogDetail(blog: any): void {
    this.router.navigate(['/articles', blog.localGuid, this.slugify(blog.title)]);
    // we want to persist this data even if there is a refresh
  }


  slugify(str: string): any {
    // check for spaces and replace with -
    str = str.replace(/\s/g, '-');
    // convert all letters to lower case
    str = str.toLowerCase();

    return str;
  }

  concatCategoryStrings(str: any): any {
    str = str.join(' ');
    return str.toLowerCase();
  }

}
