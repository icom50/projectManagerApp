import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { User } from 'src/app/models/users.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {
  user: User;
  form: FormGroup;
  constructor(private _dataService: DataService,
    // private router: Router,
    private route: ActivatedRoute) { }



  task: any;
  ngOnInit() {

    this.form = new FormGroup({
      username: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      avatar_url: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(),
      company: new FormControl(),
      links: new FormControl(),
      tasks: new FormControl(),
      _id: new FormControl(),
      job: new FormControl(),
      projects: new FormControl(),
      __v: new FormControl()
    });

    // const id = this.route.snapshot.params.id;
    const id = "5da987981a158f09eb249ceb"


    this
    ._dataService
    .getUserSecure(id)
    .subscribe((data: User) => {
      this.user = data['users'];
      this.form.setValue(this.user) // va remplir tout les champs correspondant
      console.log('data -----------------')
      console.log(this.user)
    })
  }
}
