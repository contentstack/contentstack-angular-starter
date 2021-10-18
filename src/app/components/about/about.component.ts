import { Component, OnInit } from '@angular/core';
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
export class AboutComponent implements OnInit {

  constructor(private cs: ContentstackQueryService, private seo: SeoService, private metaTagService: Meta, private store: Store) { }
  page = 'About';
  aboutContent: any = {};
  getEntry() {
    this.cs.getEntryWithQuery('page', { key: 'url', value: '/about-us' }).then(entry => {
      this.aboutContent = entry[0][0];
      this.store.dispatch(actionPage({ page: entry[0][0] }));
      this.store.dispatch(actionBlogpost({ blogpost: null }));
      if (this.aboutContent.seo) { this.seo.getSeoField(this.aboutContent.seo, this.metaTagService); }
    }, err => {
      console.log(err, 'err');
    });
  }

  ngOnInit(): void {
    this.getEntry();
  }
}
