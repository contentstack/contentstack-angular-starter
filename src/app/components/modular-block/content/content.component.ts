import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: []
})
export class ContentComponent implements OnInit {
  constructor() { }
  @Input() content: any;
  ngOnInit(): void { }
}
