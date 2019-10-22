import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  form: FormGroup;
  loginControl: AbstractControl;
  passwordControl: AbstractControl;

  constructor(fb: FormBuilder) { 
    this.form = fb.group({
      'login': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required]
    });

    this.loginControl = this.form.get('login');
    this.passwordControl = this.form.get('password');
  }

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

  login(value: any): void {
    console.log(this.form);
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

}
