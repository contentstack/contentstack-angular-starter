import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { actionFooter } from 'src/app/store/actions/state.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit, AfterContentInit {
  constructor(private cs: ContentstackQueryService, private store: Store) { }
  footerContent: any = {};
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

  buildNavigation(ent, ft) {
    let newFooter = { ...ft };
    if (ent.length !== newFooter.navigation.link.length) {
      ent.forEach((entry) => {
        const fFound = newFooter?.navigation.link.find(
          (nlink) => nlink.title === entry.title
        );
        if (!fFound) {
          newFooter.navigation.link?.push({
            title: entry.title,
            href: entry.url,
            $: entry.$,
          });
        }
      });
    }
    return newFooter;
  }

  getFooterEntry() {
    Promise.all([
      this.cs.getEntry('page'),
      this.cs.getEntry('footer', [], ["copyright"])
    ]).then(entry => {
      this.footerContent = this.buildNavigation(entry[0][0], entry[1][0][0]);
      const jsonData = this.filterObject(this.footerContent)
      this.store.dispatch(actionFooter({ footer: jsonData }));
    }, err => {
      console.log(err, 'err');
    });
  }
  ngOnInit(): void {
    this.getFooterEntry();
  }
  ngAfterContentInit(): void {
    this.cs.onEntryChange(() => {
      this.getFooterEntry();
    })
  }
}
