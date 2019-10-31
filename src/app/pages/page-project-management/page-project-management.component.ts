import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-page-project-management',
  templateUrl: './page-project-management.component.html',
  styleUrls: ['./page-project-management.component.scss']
})
export class PageProjectManagementComponent implements OnInit {

  constructor(private nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

}
