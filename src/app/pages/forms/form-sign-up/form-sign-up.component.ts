import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/utils/validators/form.validators.password';
import { DataService } from '../../../services/data.service'

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit {

  user : User
  form : FormGroup
  matcher = new MyErrorStateMatcher();
 
  constructor(fb : FormBuilder, private dataService : DataService) { 
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      'password' : ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      'confirmPassword' : ['']
    },{validator : this.checkPasswords})
    
  }

  checkPasswords(group: FormGroup) {
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPassword').value;
    if(pass === confirmPass){
      return true;
    }
    else{
      return false;
    }
}

  signUp(){
    this.user = this.form.value;
    this.dataService.postUser(this.user).subscribe((data:User)=>{
      this.user = data;
    })
  }

  getErrorMessage(field:string):string {
    const error = {
      required : "This field is required",
      email: "This field must contains a valid email",
      maxLength : "This field cannot contain more data"
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
