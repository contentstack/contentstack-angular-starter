import { Component, OnInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { Meta } from '@angular/platform-browser';
import { SeoService } from '../../seo.service';
import { Store } from '@ngrx/store';
import { actionBlogpost, actionPage } from 'src/app/store/actions/state.actions';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: []
})
export class ContactComponent implements OnInit {
  constructor(private cs: ContentstackQueryService, private metaTagService: Meta, private seo: SeoService, private store: Store) { }
  page = 'Contacts';
  contactContent: any = {};
  getEntry() {
    this.cs.getEntryWithQuery('page', { key: 'url', value: '/contact-us' }).then(entry => {
      this.contactContent = entry[0][0];
      this.store.dispatch(actionPage({ page: entry[0][0] }));
      this.store.dispatch(actionBlogpost({ blogpost: null }));
      if (this.contactContent.seo) { this.seo.getSeoField(this.contactContent.seo, this.metaTagService); }
    }, err => {
      console.log(err, 'err');
    });
  }

  ngOnInit(): void {
    this.getEntry();
  }
}
