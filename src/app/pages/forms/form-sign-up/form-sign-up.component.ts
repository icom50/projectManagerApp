import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit {

  user : User
  form : FormGroup

 
  constructor(private fb: FormBuilder, private dataService : DataService, private router : Router) { 
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(50)]),
      password : new FormControl(null , [Validators.required, Validators.maxLength(50)]),
      confirmPassword : new FormControl(null, [])
    })

  }


  signUp(){
    this.user = this.form.value;
    this.dataService.postUser(this.user).subscribe((data:User)=>{
      this.user = data;
    })
    this.router.navigate(['/'])
  }

  getErrorMessage(field:string):string {
    const error = {
      required : "This field is required",
      email: "This field must contains a valid email",
      maxlength : "This field cannot contain more data"
    };
    let returnValue = '';
    Object.keys(this.form.controls[field].errors).map(key=>{
      returnValue += `${error[key]}`;
    })
    return returnValue
  }

  ngOnInit() {
    
  }

}
