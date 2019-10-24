import { Component, OnInit } from '@angular/core';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss']
})
export class PageProjectsComponent implements OnInit {



  constructor() { }

  faSortUp = faSortUp;
  faSortDown = faSortDown;
  isShow = false;
 
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  ngOnInit() {
  }

}
