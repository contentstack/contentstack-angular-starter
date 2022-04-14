import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { Router } from '@angular/router';
import { SeoService } from '../../seo.service';
import { Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { actionBlogpost, actionPage } from 'src/app/store/actions/state.actions';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: []
})

export class ArticleComponent implements OnInit, AfterContentInit {
  constructor(private cs: ContentstackQueryService, private router: Router, private seo: SeoService, private metaTagService: Meta, private store: Store) { }
  page = 'Blog';
  articleContent: any = {};
  blogContent: any = {};
  filterObject(inputObject) {
    const unWantedProps = [
      "uid",
      "_version",
      "ACL",
      "_in_progress",
      "created_at",
      "created_by",
      "updated_at",
      "updated_by",
      "publish_details",
    ];
    for (const key in inputObject) {
      unWantedProps.includes(key) && delete inputObject[key];
      if (typeof inputObject[key] !== "object") {
        continue;
      }
      inputObject[key] = this.filterObject(inputObject[key]);
    }
    return inputObject;
  }
  getEntry() {
    Promise.all([
      this.cs.getEntryWithQuery('page', { key: 'url', value: '/blog' }, []),
      this.cs.getEntryWithQuery('blog_post', { key: 'url', value: this.router.url }, ['author', 'related_post'], ["body", "related_post.body"])
    ]).then(entries => {
      if (entries[0][0][0].length === 0 || entries[1][0][0].length === 0) { this.router.navigate(["/404"])}
      this.blogContent = entries[0][0][0];
      this.articleContent = entries[1][0][0];
      const pageData = this.filterObject(entries[0][0][0]);
      const blogData = this.filterObject(entries[1][0][0]);
      this.store.dispatch(actionPage({ page: pageData }));
      this.store.dispatch(actionBlogpost({ blogpost: blogData }));
      if (this.articleContent.seo) { this.seo.getSeoField(this.articleContent.seo, this.metaTagService); }
    }, err => {
      console.log(err, 'err');
    });
  }
  ngOnInit(): void {
    this.getEntry();
  }
  ngAfterContentInit(): void {
    this.cs.onEntryChange(() => {
      this.getEntry();
    })
  }
}
