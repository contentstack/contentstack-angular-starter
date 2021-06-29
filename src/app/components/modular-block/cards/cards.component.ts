import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: []
})
export class CardsComponent implements OnInit {
  constructor() { }
  @Input() cards: any;
  ngOnInit(): void { }
}
