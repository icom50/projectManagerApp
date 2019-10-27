import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/utils/validators/form.validators.password';
import { DataService } from '../../../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-sign-up',
  templateUrl: './form-sign-up.component.html',
  styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit {

    user : User;
    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private _dataService : DataService, private router : Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return console.log('invalid');
        }
        else{
            this.user = this.registerForm.value;
            this._dataService.postUser(this.user).subscribe((data : User)=>{
                this.user = data;
                this.router.navigate(['/']);
            })
        }
    }
}
