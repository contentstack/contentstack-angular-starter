import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-section',
  templateUrl: './team.component.html',
  styleUrls: []
})
export class TeamComponent implements OnInit {
  constructor() { }
  @Input() team: any;
  ngOnInit(): void { }
}
