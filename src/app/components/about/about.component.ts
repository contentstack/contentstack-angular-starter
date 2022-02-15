import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { SeoService } from '../../seo.service';
import { Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { actionBlogpost, actionPage } from 'src/app/store/actions/state.actions';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: []
})
export class AboutComponent implements OnInit, AfterContentInit {

  constructor(private cs: ContentstackQueryService, private seo: SeoService, private metaTagService: Meta, private store: Store) { }
  page = 'About';
  aboutContent: any = {};
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
    this.cs.getEntryWithQuery('page', { key: 'url', value: '/about-us' }, [],
      ["page_components.section_with_buckets.buckets.description",]).then(entry => {
        this.aboutContent = entry[0][0];
        const jsonData = this.filterObject(entry[0][0])
        this.store.dispatch(actionPage({ page: jsonData }));
        this.store.dispatch(actionBlogpost({ blogpost: null }));
        if (this.aboutContent.seo) { this.seo.getSeoField(this.aboutContent.seo, this.metaTagService); }
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
