import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users.model';
import { tap, shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthentificatorService {

  constructor(private _dataservice: DataService) { }

  login(user:User ) {
    console.log('COUCOU FROM AUTHENTIFICATOR.LOGIN')
    return this._dataservice
        .loginUser(user)
        .pipe(tap((res => this.setSession(res)))) 
        .pipe(shareReplay());
        
}
      
private setSession(authResult) {
    console.log('COUCOU FROM SETSESSION')
    console.log(authResult)
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem('current_user',authResult.currentUser)
}          

logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('current_user');
}

public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}    
}
