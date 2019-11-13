import { Injectable } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible : boolean
  current_user:string
  constructor() {
    this.visible = false
  }

  hide() { this.visible = false; }

  show() { 
    this.visible = true; 
    this.current_user = localStorage.getItem('current_user'); 
  }
}
