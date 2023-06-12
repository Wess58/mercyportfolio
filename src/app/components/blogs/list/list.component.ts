import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { style, state, animate, transition, trigger } from '@angular/animations';

import { MediumService } from "../../../services/medium.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0, marginTop: 20 }),
        animate('300ms ease', style({ opacity: 1, marginTop: 0 }))
      ])
    ])
  ]
})
export class ListComponent implements OnInit {

  blogs: any = [];
  filteredBlogs: any = [];
  activeBlog: any;
  descending: Boolean = true;
  searchBlog: any;
  showQuickNotification = false;
  blogNotFound = false;

  constructor(
    private mediumService: MediumService,
    protected router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      window.scroll(0, 0);
    }, 10);

    this.getAllPosts();
  }


  searchBlogByTitle(name: any): void {

    this.filteredBlogs = [];

    if (name) {
      this.blogs.forEach((blog: any) => {
        if (blog.searchTerms.includes(name.toLowerCase().trim())) {
          this.blogNotFound = false;
          this.filteredBlogs.push(blog);

        } else if (this.filteredBlogs.length === 0) {
          this.blogNotFound = true;
        }
      });
    } else {
      this.blogNotFound = false;
      this.filteredBlogs = this.blogs;
    }

  }

  getAllPosts(): void {
    this.mediumService.getPosts().subscribe(
      (res: any) => {

        this.filteredBlogs = res.items;
        this.blogs = res.items;

        this.blogs.forEach((blog: any) => {
          blog.categories = this.concatCategoryStrings(blog.categories);
          blog.searchTerms = blog.title.toLowerCase() + ' ' + blog.categories.toLowerCase();
          // blog.pubDate = moment(blog.pubDate).format('LL');
          // console.log(this.blogs);
          // console.log(moment(blog.pubDate).format('LL'));
        });

      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  toBlogDetail(blog: any): void {
    this.router.navigate(['/blog/' + this.slugify(blog.title)], { state: { data: blog } });

    // we want to persist this data even if there is a refresh
    sessionStorage.setItem("blog", JSON.stringify(blog));
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


  shareBlog(blog: any): void {
    //copy blog link url
    navigator.clipboard.writeText(location.href + '/' + this.slugify(blog.title));

    this.showQuickNotification = true;
    setTimeout(() => {
      this.showQuickNotification = false;

    }, 3000);
  }


}
