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
  getEntry() {
    this.cs.getEntry('header', ['navigation_menu.page_reference']).then(entry => {
      this.activeLink = this.router.url;
      this.headerContent = entry[0][0];
      this.store.dispatch(actionHeader({ header: entry[0][0] }));
    }, err => {
      console.log(err, 'err');
    });
  }

  ngOnInit(): void {
    this.getEntry();
  }
}
