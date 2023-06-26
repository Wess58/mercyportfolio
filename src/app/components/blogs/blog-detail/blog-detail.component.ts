import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { MediumService } from "../../../services/medium.service";


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class BlogDetailComponent implements OnInit {

  blogs: any = [];
  blog: any;
  isBlogInSession = false;
  currentArticleIndex = 0;
  isCopied = false;

  constructor(
    protected router: Router,
    private activatedRoute: ActivatedRoute,
    private mediumService: MediumService,
    private sanitizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }


  getBlogs(): void {

    const blogName = this.activatedRoute.snapshot.params['id'];

    this.mediumService.getPosts().subscribe(
      (res: any) => {
        window.scroll(0, 0);

        this.blogs = res.items;

        this.blogs.forEach((blog: any, index: any) => {

          if (blog.title.toLowerCase().includes(this.unSlugify(blogName).toLowerCase())) {
            this.blog = blog;
            this.currentArticleIndex = index;
          }
        });

      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  unSlugify(str: string) {
    // check for spaces and replace with -
    str = str.replace(/-/g, " ");
    // convert all letters to lower case
    str = str.toLowerCase();

    return str;
  }

  slugify(str: string): any {
    // check for spaces and replace with -
    str = str.replace(/\s/g, '-');
    // convert all letters to lower case
    str = str.toLowerCase();

    return str;
  }

  getClickedArticle(blog: any): void {
    this.router.navigate(['/articles/' + this.slugify(blog.title)]);

    setTimeout(() => {
      const blogName = this.activatedRoute.snapshot.params['id'];

      this.blogs.forEach((blog: any, index: any) => {
        if (blog.title.toLowerCase().includes(this.unSlugify(blogName).toLowerCase())) {
          this.blog = blog;
          this.currentArticleIndex = index;
        }
      });
    }, 1);

    setTimeout(() => {
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

}
