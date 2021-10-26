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
  getFooterEntry() {
    this.cs.getEntry('footer').then(entry => {
      this.footerContent = entry[0][0];
      const jsonData = this.filterObject(entry[0][0])
      this.store.dispatch(actionFooter({ footer: jsonData }));
    }, err => {
      console.log(err, 'err');
    });
  }
  ngOnInit(): void {
    this.getFooterEntry();
  }
}
