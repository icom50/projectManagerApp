import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-page-log',
  templateUrl: './page-log.component.html',
  styleUrls: ['./page-log.component.scss']
})
export class PageLogComponent implements OnInit {

  constructor(private nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

}
