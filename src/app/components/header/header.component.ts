import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentstackQueryService } from '../../cs.query.service';
import { Store } from '@ngrx/store';
import { actionHeader } from 'src/app/store/actions/state.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit, AfterContentInit {

  constructor(private router: Router, private cs: ContentstackQueryService, private store: Store) { }
  headerContent: any = {};
  activeLink: any;
  filterObject(inputObject) {
    const unWantedProps = [
      "uid",
      "_owner",
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

  buildNavigation(ent, hd) {
    let newHeader = { ...hd };
    if (ent.length !== newHeader.navigation_menu.length) {
      ent.forEach((entry) => {
        const hFound = newHeader?.navigation_menu.find(
          (navLink) => navLink.label === entry.title
        );
        if (!hFound) {
          newHeader.navigation_menu?.push({
            label: entry.title,
            page_reference: [
              { title: entry.title, url: entry.url, $: entry.$ },
            ],
            $: {}
          });
        }
      });
    }
    return newHeader
  }



  getEntry() {
    Promise.all([
      this.cs.getEntry('page'),
      this.cs.getEntry('header', ['navigation_menu.page_reference'], ["notification_bar.announcement_text"])
    ]).then(entry => {
      this.activeLink = this.router.url;
      this.headerContent = this.buildNavigation(entry[0][0], entry[1][0][0])
      const jsonData = this.filterObject(this.headerContent);
      this.store.dispatch(actionHeader({ header: jsonData }));
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
