import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: []
})
export class BucketsComponent implements OnInit {
  constructor() { }
  @Input() mission: any;
  ngOnInit(): void { }
}
