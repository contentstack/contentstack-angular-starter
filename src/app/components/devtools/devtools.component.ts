import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-devtools',
  templateUrl: './devtools.component.html',
  styleUrls: []
})
export class DevtoolsComponent {
  response$: Observable<any>;

    constructor(private store: Store) { 
      this.response$ = store.pipe();
    }
    
}
