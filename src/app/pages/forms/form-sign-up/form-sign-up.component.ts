import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/utils/validators/form.validators.password';
import { DataService } from '../../../services/data.service'
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { RandomSentencesService } from 'src/app/services/random-sentences.service';

@Component({
    selector: 'app-form-sign-up',
    templateUrl: './form-sign-up.component.html',
    styleUrls: ['./form-sign-up.component.scss']
})
export class FormSignUpComponent implements OnInit {

    user: User;
    registerForm: FormGroup;
    sentence = this.randomSentences.getRandomSentence()
    sentenceSources = this.randomSentences.getSources()

    constructor(private formBuilder: FormBuilder, private _dataService: DataService, private router: Router, private nav: NavbarService, private randomSentences: RandomSentencesService) { }

    get f() { return this.registerForm.controls; }

    

    onSubmit(e) {
        if (this.registerForm.invalid) {
            e.preventDefault();
        }
        else {
            this.user = this.registerForm.value;
            this._dataService.postUser(this.user).subscribe((data: User) => {
                this.user = data;
                this.router.navigate(['/']);
            })
            setTimeout(() => {
                alert('the user was created')
            }, 1000)

        }
    }

    ngOnInit() {
        this.nav.hide();
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            confirmPassword: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }


}
