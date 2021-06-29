import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContentstackModule } from '../modules/contentstack/contentstack.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Config, environment } from '../environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { ArticleComponent } from './components/article/article.component';
import { RenderComponent } from './components/render-components/render.components';
import { HeroComponent } from './components/modular-block/hero/hero.component';
import { ContentComponent } from './components/modular-block/content/content.component';
import { BucketsComponent } from './components/modular-block/buckets/buckets.component';
import { FromBlogComponent } from './components/modular-block/blog/blog.component';
import { CardsComponent } from './components/modular-block/cards/cards.component';
import { EmbedComponent } from './components/modular-block/embed/embed.component';
import { TeamComponent } from './components/modular-block/team/team.component';
import { SanitizeHtmlPipe } from 'src/modules/SanitizeHtmlPipe';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    ArticleComponent,
    RenderComponent,
    HeroComponent,
    ContentComponent,
    BucketsComponent,
    FromBlogComponent,
    CardsComponent,
    EmbedComponent,
    TeamComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentstackModule.initializeApp(Config),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
