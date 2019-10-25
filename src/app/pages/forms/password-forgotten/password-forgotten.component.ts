import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit {

  formPass : FormGroup;

  constructor(private fb : FormBuilder, private router : Router ) {
    this.formPass = this.fb.group({
      emailPass : new FormControl(null, [Validators.required, Validators.email])
    })
   }

  submitPass(){
    this.router.navigate(['/']);
    setTimeout(()=>{
      alert('Instructions send')
    },1000)
    
  }

  ngOnInit() {
  }

}
