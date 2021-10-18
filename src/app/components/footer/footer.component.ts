import { Component, OnInit } from '@angular/core';
import { ContentstackQueryService } from '../../cs.query.service';
import { actionFooter } from 'src/app/store/actions/state.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {
  constructor(private cs: ContentstackQueryService, private store: Store) { }
  footerContent: any = {};
  getFooterEntry() {
    this.cs.getEntry('footer').then(entry => {
      this.footerContent = entry[0][0];
      this.store.dispatch(actionFooter({ footer: entry[0][0] }));
    }, err => {
      console.log(err, 'err');
    });
  }
  ngOnInit(): void {
    this.getFooterEntry();
  }
}
