import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoService } from '../../seo.service';
import { Store } from '@ngrx/store';
import { actionBlogpost, actionPage } from 'src/app/store/actions/state.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit, AfterContentInit {
  constructor(private cs: ContentstackQueryService, private router: Router, private metaTagService: Meta, private seo: SeoService, private store: Store) { }
  page = 'Home';
  homeContent: any = {};
  entryUid: string;
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
    this.cs.getEntryWithQuery('page', { key: 'url', value: this.router.url },
      ['page_components.from_blog.featured_blogs'],
      ["page_components.from_blog.featured_blogs.body",
        "page_components.section_with_buckets.buckets.description",]).then(entry => {
          if (entry[0].length === 0) { this.router.navigate(["/404"])}
          this.homeContent = entry[0][0];
          const jsonData = this.filterObject(entry[0][0])
          this.store.dispatch(actionPage({ page: jsonData }));
          this.store.dispatch(actionBlogpost({ blogpost: null }));
          if (this.homeContent.seo) { this.seo.getSeoField(this.homeContent.seo, this.metaTagService); }
        }, err => {
          console.log(err);
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
