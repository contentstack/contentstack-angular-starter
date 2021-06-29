import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: []
})
export class ErrorComponent implements OnInit {

  constructor() { }
  page = 'Error';
  ngOnInit(): void { }
}
