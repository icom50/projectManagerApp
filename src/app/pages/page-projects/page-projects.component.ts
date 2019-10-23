import { Component, OnInit } from '@angular/core';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.scss']
})
export class PageProjectsComponent implements OnInit {

  faSortUp = faSortUp;
  faSortDown = faSortDown;
  isActived = true;

  constructor() { }

  toggleClick(){
    console.log("object");
    // this.isActived = !this.isActived;
  
  }

  ngOnInit() {
  }

}
