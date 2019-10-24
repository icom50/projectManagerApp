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
    private router: Router,
    private route: ActivatedRoute) { }


  submitForm(){
    this.user = this.form.value;
    this._dataService.putUser(this.user).subscribe((data : User) => {
      this.user = data;
      this.router.navigate(['user/:id']); /** la navigation retourne a 'users' */
    })
  }

  getErrorMessage(field:string): string { // gestion des erreurs
    const errors = {
      required:'This field is required',
      email:'This field must contains a valid email',
      maxlength:'This field contains too many characters'
    };
    let returnValue = '';
    Object.keys(this.form.controls[field].errors).map((key, index) => {
      returnValue += `Rule ${index} - ${errors[key]}`
    });
    return returnValue
  }


  // task: any;
  ngOnInit() {
    //this.dataService.getUserSecure()

    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      firstname: new FormControl(null, [Validators.maxLength(50)]),
      lastname: new FormControl(null, [Validators.maxLength(50)]),
      avatar_url: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.maxLength(20)]),
      company: new FormControl(null, [Validators.maxLength(50)]),
      links: new FormControl(),
      tasks: new FormControl(),
      _id: new FormControl(),
      job: new FormControl(null, [Validators.maxLength(50)]),
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
