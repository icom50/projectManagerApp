import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { NavbarService } from 'src/app/services/navbar.service';


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


  constructor(private nav :NavbarService) { }
  toggle = false;
  status = 'Disable';

  ngOnInit() {
  }

}
