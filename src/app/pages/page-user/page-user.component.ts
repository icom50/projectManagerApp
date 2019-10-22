import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { User } from 'src/app/models/users.model';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {
  user: User;
  form: FormGroup;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    //this.dataService.getUserSecure()

    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      github: new FormControl(null, [Validators.required]),
      linkedin: new FormControl(null, [Validators.required])
    });
  }

}
