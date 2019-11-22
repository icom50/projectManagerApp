import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from 'src/app/services/navbar.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/users.model';

@Component({
  selector: 'common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.scss']
})
export class CommonNavbarComponent implements OnInit {
  faPlus = faPlus;
  user: User;

  constructor(private nav: NavbarService, private _dataService: DataService) { }

  ngOnInit() {
    if (localStorage.getItem('current_user')) {
      const id = localStorage.getItem('current_user');
      this._dataService.getUserById(id).subscribe((data: User) => {
        this.user = data['users'];
      })
    }
  }
}