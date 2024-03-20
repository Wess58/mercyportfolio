import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastListComponent } from "./components/podcasts/podcast-list/podcast-list.component";
import { PodcastDetailComponent } from "./components/podcasts/podcast-detail/podcast-detail.component";
import { BlogListComponent } from "./components/blogs/blog-list/blog-list.component";
import { BlogDetailComponent } from "./components/blogs/blog-detail/blog-detail.component";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-mercy-munyange', component: AboutComponent },
  { path: 'articles', component: BlogListComponent },
  { path: 'articles/:guid/:id', component: BlogDetailComponent },
  { path: 'podcasts', component: PodcastListComponent },
  { path: 'podcast/:index', component: PodcastDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      anchorScrolling: 'enabled',
      // scrollPositionRestoration: "enabled"
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
