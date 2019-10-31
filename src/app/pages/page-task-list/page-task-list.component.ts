import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-page-task-list',
  templateUrl: './page-task-list.component.html',
  styleUrls: ['./page-task-list.component.scss']
})
export class PageTaskListComponent implements OnInit {

  constructor(private nav : NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

}
