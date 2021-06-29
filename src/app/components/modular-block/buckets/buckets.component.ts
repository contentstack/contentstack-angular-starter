import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: []
})
export class BucketsComponent implements OnInit {
  constructor() { }
  @Input() sectionBuckets: any;
  @Input() page: string;
  ngOnInit(): void { }
}
