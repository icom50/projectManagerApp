import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/users.model';
import { FormGroup, FormBuilder,FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data.service'; 
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthentificatorService } from '../../../services/authentificator.service'
import { Router } from '@angular/router';
import { RandomSentencesService } from 'src/app/services/random-sentences.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {
 

  user: User;
  form: FormGroup;
  loginControl: AbstractControl;
  passwordControl: AbstractControl;
  loginRoute;
  sentence = this.randomSentences.getRandomSentence()
  sentenceSources = this.randomSentences.getSources()

  constructor(fb: FormBuilder, private dataService: DataService, private nav : NavbarService, private auth : AuthentificatorService, private router : Router, private randomSentences: RandomSentencesService) { 
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
    return returnValue;
  }

  login(value: any): void {
    event.preventDefault()
    // console.log(this.form);
    
    // this.user = this.form.value;
    // this.dataService.loginUser(this.user).subscribe((data:any) => {
    //   // console.log(data.error);   
    //   if(data.error === 403) {
    //     alert('This user does not exist. Please verify your email and password or create an account');
    //     this.loginRoute = "/login";
    //   } else {
    //     //if user found, go find his _id and add it to url
    //     this.dataService.getUserByEmail(this.user.email).subscribe((data:any) => {
    //       const userId = data.users._id;
    //       this.loginRoute = `/user/`+userId;
    //     })
    //   }
    // });

    // ^- code avant la création de l'authentificator.service || v- code de l'authentificator service
    this.user = this.form.value;
    this.auth.login(this.user).subscribe((data:any) => {
        if(data.error === 403) { // could be removed
          alert('Your email and/or password are incorrect. Please check your email and password or create an account');
          // this.loginRoute = "/login";
        } else {
          //if user found, go find his _id and add it to url
          this.dataService.getUserByEmail(this.user.email).subscribe((data:any) => {
            const userId = data.users._id;
            // this.loginRoute = `/user/`+userId;
            this.router.navigate([`/user/${userId}`])
          })
        }
      }, err => {
        if (err) alert('Your email and/or password are incorrect. Please check your email and password or create an account');
      });
    
  }

  ngOnInit() {
    this.nav.hide();
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

}
