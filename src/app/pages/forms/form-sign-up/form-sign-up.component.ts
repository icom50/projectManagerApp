import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit {

  user : User
  form : FormGroup
  constructor() { }

  getErrorMessage(field:string):string {
    const error = {
      required : "This field is required",
      email: "This field must contains a valid email"
    };
    let returnValue = '';
    Object.keys(this.form.controls[field].errors).map((key, index)=>{
      returnValue += `${error[key]}`;
    })
    return returnValue
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

}
