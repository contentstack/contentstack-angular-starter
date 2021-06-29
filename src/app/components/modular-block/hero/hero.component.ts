import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: []
})
export class HeroComponent implements OnInit {
  constructor() { }
  @Input() hero: any;
  @Input() page: string;
  ngOnInit(): void { }
}
