import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ContentstackQueryService } from '../../cs.query.service';
import { Store } from '@ngrx/store';
import { actionHeader } from 'src/app/store/actions/state.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private cs: ContentstackQueryService, private store: Store) { }
  headerContent: any = {};
  activeLink: any;
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
    this.cs.getEntry('header', ['navigation_menu.page_reference']).then(entry => {
      this.activeLink = this.router.url;
      this.headerContent = entry[0][0];
      const jsonData = this.filterObject(entry[0][0]);
      this.store.dispatch(actionHeader({ header: jsonData }));
    }, err => {
      console.log(err, 'err');
    });
  }

  ngOnInit(): void {
    this.getEntry();
  }
}
