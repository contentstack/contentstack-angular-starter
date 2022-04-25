import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { SeoService } from '../../seo.service';
import { Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { actionBlogpost, actionPage } from 'src/app/store/actions/state.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: []
})
export class BlogComponent implements OnInit, AfterContentInit {
  constructor(private cs: ContentstackQueryService, private seo: SeoService, private metaTagService: Meta, private store: Store) { }
  page = 'Blog';
  entries=[];
  blogEntry: any = {};
  blogContent: any = [];
  archivedContent: any = [];
  filterObject(inputObject) {
    const unWantedProps = [
      "uid",
      "_version",
      "_owner",
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
      this.cs.getEntryWithQuery('page', { key: 'url', value: '/blog' }),
      this.cs.getEntry('blog_post', ['author', 'related_post'], ["body"])
    ]).then(entries => {
      this.entries = entries;
      this.blogEntry = entries[0][0][0];
      this.filterBlogTypes(entries[1][0]);
      const pageData = this.filterObject(entries[0][0][0])
      const blogData = this.filterObject(entries[1][0])

      this.store.dispatch(actionPage({ page: pageData }));
      this.store.dispatch(actionBlogpost({ blogpost: blogData }));
      if (this.blogEntry.seo) { this.seo.getSeoField(this.blogEntry.seo, this.metaTagService); }
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

  filterBlogTypes(entries) {
    this.blogContent = [];
    this.archivedContent = [];
    entries.map(entry => {
      if (entry.is_archived) {
        this.archivedContent.push(entry);
      } else {
        this.blogContent.push(entry);
      }
    });
  }
}
