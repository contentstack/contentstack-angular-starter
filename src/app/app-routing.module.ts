import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { ArticleComponent } from './components/article/article.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  {
    path: 'blog/:id', component: ArticleComponent,
    children: [{
      path: '**',
      component: ArticleComponent,
    }]
  },
  { path: '404', component: ErrorComponent },
  { path: ':id', component: HomeComponent },
  { path: '**', component: ErrorComponent, redirectTo: "404" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
