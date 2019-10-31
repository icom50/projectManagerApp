import { Injectable } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible : boolean
  constructor() {

    this.visible = false

   }
   hide() { this.visible = false; }

   show() { this.visible = true; }
}
