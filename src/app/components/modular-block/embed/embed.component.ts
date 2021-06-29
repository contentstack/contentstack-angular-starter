import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'embed-section',
  templateUrl: './embed.component.html',
  styleUrls: []
})
export class EmbedComponent implements OnInit {
  constructor() { }
  @Input() embed: any;
  ngOnInit(): void { }
}
