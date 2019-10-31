import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.scss']
})
export class CommonNavbarComponent implements OnInit {
  faPlus = faPlus;
 

  constructor(private nav: NavbarService) { }

  ngOnInit() {
  }

}
