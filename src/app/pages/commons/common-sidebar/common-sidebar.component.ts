import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthentificatorService } from '../../../services/authentificator.service';
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
  faClipboardCheck = faClipboardCheck;

  constructor(public auth : AuthentificatorService, private nav : NavbarService) { }
  toggle = false;
  status = 'Disable';

  logout(){
    this.auth.logout()
  }

  ngOnInit() {
  }

}
