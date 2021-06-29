import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'render-component',
  templateUrl: './render.components.html',
  styleUrls: []
})
export class RenderComponent implements OnInit {
  constructor() { }
  @Input() pageComponents: any;
  @Input() page: string;
  @Input() contentTypeUid:string;
  @Input() entryUid:string;
  @Input() locale:string;
  ngOnInit(): void {}
}
