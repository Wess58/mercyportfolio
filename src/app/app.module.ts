import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PathLocationStrategy, LocationStrategy,HashLocationStrategy } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BlogListComponent } from './components/blogs/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blogs/blog-detail/blog-detail.component';
import { PodcastDetailComponent } from './components/podcasts/podcast-detail/podcast-detail.component';
import { PodcastListComponent } from './components/podcasts/podcast-list/podcast-list.component';
import { SanitizeIframePipe } from './pipes/sanitize-iframe.pipe';
import { AboutComponent } from './components/about/about.component';
import { BookComponent } from './components/book/book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    BlogListComponent,
    BlogDetailComponent,
    PodcastDetailComponent,
    PodcastListComponent,
    SanitizeIframePipe,
    AboutComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      // PROD
      // useClass: PathLocationStrategy,
      // TEST
      useClass: HashLocationStrategy

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
