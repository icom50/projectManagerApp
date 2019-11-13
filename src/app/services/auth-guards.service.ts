import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificatorService } from './authentificator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate{
 constructor(private route : Router, private _authService : AuthentificatorService){ }
  canActivate(
    route : ActivatedRouteSnapshot,
    state : RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if(this._authService.isLoggedOut){
      return true
    }
    else{
      this.route.navigate(['/'])
    }
  }
}
