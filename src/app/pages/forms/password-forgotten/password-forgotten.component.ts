import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import {DataService} from '../../../services/data.service'

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit {

  formPass : FormGroup;

  constructor(private fb : FormBuilder, private router : Router, private nav : NavbarService, private _dataService : DataService ) {
    this.formPass = this.fb.group({
      emailPass : new FormControl(null, [Validators.required, Validators.email])
    })
   }

  submitPass(){
    this._dataService.postForgottenPassword(this.formPass.value.emailPass)
    this.router.navigate(['/']);
    setTimeout(()=>{
      alert('Instructions send')
    },1000)
  }

  getErrorMessage(field:string):string {
    const error = {
      required : "This field is required",
      email: "This field must contains a valid email",
    };
    let returnValue = '';
    Object.keys(this.formPass.controls[field].errors).map(key=>{
      returnValue += `${error[key]}`;
    })
    return returnValue
  }

  ngOnInit() {
    this.nav.hide();
  }

}
