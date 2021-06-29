import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'from-blog',
  templateUrl: './blog.component.html',
  styleUrls: []
})
export class FromBlogComponent implements OnInit {
  constructor() { }
  @Input() blog: any;
  ngOnInit(): void { }
}
