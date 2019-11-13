import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/users.model';
import { FormGroup, FormBuilder,FormControl, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../../../services/data.service'; 
import { NavbarService } from 'src/app/services/navbar.service';
import { AuthentificatorService } from '../../../services/authentificator.service'
import { Router } from '@angular/router';

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

  constructor(fb: FormBuilder, private dataService: DataService, private nav : NavbarService, private auth : AuthentificatorService, private router : Router) { 
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
        console.log(data);
        // console.log('COUCOU FROM AUTH LOGIN')   
        if(data.error === 403) {
          alert('This user does not exist. Please verify your email and password or create an account');
          // this.loginRoute = "/login";
        } else {
          //if user found, go find his _id and add it to url
          this.dataService.getUserByEmail(this.user.email).subscribe((data:any) => {
            const userId = data.users._id;
            // this.loginRoute = `/user/`+userId;
            this.router.navigate([`/user/${userId}`])
          })
        }
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
