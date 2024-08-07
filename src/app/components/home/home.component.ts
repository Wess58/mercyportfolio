import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  animateAfterViewInit = false;

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateAfterViewInit = true;
    }, 200);
  }

  getAllPosts(): void {
    this.mediumService.getPosts().subscribe(
      (res: any) => {
        this.blogs = res.items;
        this.blogs.forEach((blog: any) => {
          const emCollection = new DOMParser().parseFromString(blog.content, "text/html").documentElement.getElementsByTagName("figure");
        const imgSrc = new DOMParser().parseFromString(emCollection[0]?.innerHTML, "text/html").querySelectorAll('img')[0]?.src;
          const introText = new DOMParser().parseFromString(blog.content, "text/html")?.documentElement.getElementsByTagName("p")[0]?.innerHTML;
          blog.introText = introText.length > 200 ? introText.slice(0, 200) + '...' : introText;
          blog.thumbnail = imgSrc ?? 'assets/images/podcast-imgs/seo-img-the-walk-by-mercy.jpg';
          blog.categories = this.concatCategoryStrings(blog.categories);
          blog.searchTerms = blog.title.toLowerCase() + ' ' + blog.categories.toLowerCase();
          const splitGuid = blog.guid.split('/');
          blog.localGuid = splitGuid[splitGuid.length - 1];
          blog.pubDate = new Date(blog.pubDate);
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

  redirect(link: any): void {
    if (link.includes('https')) {
      window.open(link, "_blank");
    } else {
      this.router.navigate([link]);
    }
  }

}
