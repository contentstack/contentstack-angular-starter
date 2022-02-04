import { Component, OnInit, AfterContentInit } from '@angular/core';
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
export class ContactComponent implements OnInit, AfterContentInit {
  constructor(private cs: ContentstackQueryService, private metaTagService: Meta, private seo: SeoService, private store: Store) { }
  page = 'Contacts';
  contactContent: any = {};
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
    this.cs.getEntryWithQuery('page', { key: 'url', value: '/contact-us' }, [], ["page_components.section_with_html_code.description"]).then(entry => {
      this.contactContent = entry[0][0];
      const jsonData = this.filterObject(entry[0][0]);
      this.store.dispatch(actionPage({ page: jsonData }));
      this.store.dispatch(actionBlogpost({ blogpost: null }));
      if (this.contactContent.seo) { this.seo.getSeoField(this.contactContent.seo, this.metaTagService); }
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
