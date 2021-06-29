import { Component, OnInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { SeoService } from '../../seo.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: []
})
export class BlogComponent implements OnInit {
  constructor(private cs: ContentstackQueryService, private seo: SeoService, private metaTagService: Meta) { }
  page = 'Blog';
  blogEntry: any = {};
  blogContent: any = [];
  archivedContent: any = [];
  getEntry() {
    Promise.all([
      this.cs.getEntryWithQuery('page', { key: 'url', value: '/blog' }),
      this.cs.getEntry('blog_post', ['author', 'related_post'])
    ]).then(entries => {
      this.blogEntry = entries[0][0][0];
      this.filterBlogTypes(entries[1][0]);
      if (this.blogEntry.seo) { this.seo.getSeoField(this.blogEntry.seo, this.metaTagService); }
    }, err => {
      console.log(err, 'err');
    });
  }

  ngOnInit(): void {
    this.getEntry();
  }

  filterBlogTypes(entries) {
    entries.map(entry => {
      if (entry.is_archived) {
        this.archivedContent.push(entry);
      } else {
        this.blogContent.push(entry);
      }
    });
  }
}
