import { Component, AfterViewChecked, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-devtools',
  templateUrl: './devtools.component.html',
  styleUrls: []
})
export class DevtoolsComponent implements AfterViewChecked {
  response$: Observable<any>;

  constructor(private store: Store) {
    this.response$ = store.pipe();
  }

  ngAfterViewChecked(): void {
    const cslpBtn = document.getElementsByClassName('cslp-tooltip')
    if (cslpBtn.length > 0) {
      cslpBtn[0].outerHTML = null
    }
  }

  copyJsonObject(event) {
    try {
      if (!event.source["_value"]) throw "error"
      const tipValue = document.getElementById("copyTip").dataset
      tipValue.tip = "Copied"
      navigator.clipboard.writeText(JSON.stringify(event.source["_value"].response));
      setTimeout(() => {
        tipValue.tip = "Copy"
      }, 300)
    } catch (error) {
      console.error("Not an proper json object to copy", error)
    }
  }
}
