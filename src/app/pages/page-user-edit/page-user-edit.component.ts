import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { User } from 'src/app/models/users.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-page-user-edit',
  templateUrl: './page-user-edit.component.html',
  styleUrls: ['./page-user-edit.component.scss']
})
export class PageUserEditComponent implements OnInit {

  user: User;
  form: FormGroup;
  constructor(private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private nav: NavbarService,
    ) { }


  submitForm(){
    this.user = this.form.value;
    this._dataService.putUser(this.user).subscribe((data : User) => {
      this.user = data;
      const userId: string = this.user._id;
      console.log(this.user);
      console.log(this.user['users']._id);
      // this.router.navigate(['user/'+this.user._id]); /** la navigation retourne a 'users' */
      this.router.navigate([`user/${this.user['users']._id}`]);
      console.log(this.user)
    })
  }

  getErrorMessage(field: string): string { // gestion des erreurs
    const errors = {
      required:'This field is required',
      email:'This field must contains a valid email',
      maxlength:'This field contains too many characters',
      minlength:'This field contains too few characters'
    };
    let returnValue = '';
    Object.keys(this.form.controls[field].errors).map((key, index) => {
      returnValue += `Rule ${index} - ${errors[key]}`;
    });
    return returnValue;
  }

  ngOnInit() {
    this.nav.show();

    this.form = new FormGroup({
      username: new FormControl(),
      firstname: new FormControl(null, [Validators.maxLength(50)]),
      lastname: new FormControl(null, [Validators.maxLength(50)]),
      avatar_url: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.minLength(6)]),
      phone: new FormControl(null, [Validators.maxLength(20)]),
      company: new FormControl(null, [Validators.maxLength(50)]),
      links: new FormGroup({
        linkedin: new FormControl(null),
        github: new FormControl(null),
        blog: new FormControl(null),
        website: new FormControl(null),
      }),
      tasks: new FormControl(),
      _id: new FormControl(),
      job: new FormControl(null, [Validators.maxLength(50)]),
      projects: new FormControl(),
      description: new FormControl(null, [Validators.maxLength(500)]),
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
      console.log(this.user.avatar_url);
    })
  }
}
