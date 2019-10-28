import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.scss']
})
export class CommonNavbarComponent implements OnInit {
  faPlusCircle = faPlusCircle;

  constructor() { }

  ngOnInit() {
  }

}
