import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { User } from 'src/app/models/users.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.scss']
})
export class PageUserEditComponent implements OnInit {

  user: User;
  form: FormGroup;
  constructor(private _dataService: DataService,
    // private router: Router,
    private route: ActivatedRoute) { }



  task: any;
  ngOnInit() {
    //this.dataService.getUserSecure()

    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(),
      avatar_url: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      links: new FormControl(null, [Validators.required]),
      tasks: new FormControl(null, [Validators.required]),
      _id: new FormControl(null, [Validators.required]),
      job: new FormControl(null, [Validators.required]),
      projects: new FormControl(null, [Validators.required]),
      __v: new FormControl(null, [Validators.required])
    });

    const id = this.route.snapshot.params.id;
    
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
