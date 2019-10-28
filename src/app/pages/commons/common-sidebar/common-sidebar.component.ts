import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { ClassGetter } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'common-sidebar',
  templateUrl: './common-sidebar.component.html',
  styleUrls: ['./common-sidebar.component.scss']
})
export class CommonSidebarComponent implements OnInit {
  faHome = faHome;
  faBorderAll = faBorderAll;
  faTasks = faTasks;
  faSignOutAlt = faSignOutAlt;


  constructor() { }
  toggle = false;
  status = 'Disable';

  enableDisableRule(event) {
    console.log(event);
    // this.toggle = !this.toggle;
        
  }

  ngOnInit() {
  }

}
