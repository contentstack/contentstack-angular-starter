import { Component, OnInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { SeoService } from '../../seo.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: []
})
export class AboutComponent implements OnInit {

  constructor(private cs: ContentstackQueryService, private seo: SeoService, private metaTagService: Meta) { }
  page = 'About';
  aboutContent: any = {};
  getEntry() {
    this.cs.getEntryWithQuery('page', { key: 'url', value: '/about-us' }).then(entry => {
      this.aboutContent = entry[0][0];
      if (this.aboutContent.seo) { this.seo.getSeoField(this.aboutContent.seo, this.metaTagService); }
    }, err => {
      console.log(err, 'err');
    });
  }

  ngOnInit(): void {
    this.getEntry();
  }
}
