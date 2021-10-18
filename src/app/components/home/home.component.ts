import { Component, OnInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../../seo.service';
import { Store } from '@ngrx/store';
import { actionBlogpost, actionPage } from 'src/app/store/actions/state.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  constructor(private cs: ContentstackQueryService, private metaTagService: Meta, private seo: SeoService, private store: Store) { }
  page = 'Home';
  homeContent: any = {};
  entryUid: string;
  getEntry() {
    this.cs.getEntryWithQuery('page', { key: 'url', value: '/' }, ['page_components.from_blog.featured_blogs']).then(entry => {
      this.homeContent = entry[0][0];
      this.store.dispatch(actionPage({ page: entry[0][0] }));
      this.store.dispatch(actionBlogpost({ blogpost: null }));
      if (this.homeContent.seo) { this.seo.getSeoField(this.homeContent.seo, this.metaTagService); }
    }, err => {
      console.log(err);
    });

  }
  ngOnInit(): void {
    this.getEntry();
  }
}
