import { Component, OnInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { Router } from '@angular/router';
import { SeoService } from '../../seo.service';
import { Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: []
})

export class ArticleComponent implements OnInit {
  constructor(private cs: ContentstackQueryService, private router: Router, private seo: SeoService, private metaTagService: Meta, private store: Store) { }
  page = 'Blog';
  articleContent: any = {};
  blogContent: any = {};
  getEntry() {
    Promise.all([
      this.cs.getEntryWithQuery('page', { key: 'url', value: '/blog' }, []),
      this.cs.getEntryWithQuery('blog_post', { key: 'url', value: this.router.url }, ['author', 'related_post'])
    ]).then(entries => {
      this.blogContent = entries[0][0][0];
      this.articleContent = entries[1][0][0];
      this.store.dispatch(actionPage({ page: entries[0][0][0] }));
      this.store.dispatch(actionBlogpost({ blogpost: entries[1][0][0] }));
      if (this.articleContent.seo) { this.seo.getSeoField(this.articleContent.seo, this.metaTagService); }
    }, err => {
      console.log(err, 'err');
    });
  }
  ngOnInit(): void {
    this.getEntry();
  }
}
function actionPage(arg0: { page: any; }): any {
  throw new Error('Function not implemented.');
}

function actionBlogpost(arg0: { blogpost: any; }): any {
  throw new Error('Function not implemented.');
}

