import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.scss']
})
export class ZippyComponent implements OnInit {


  
  constructor() { }

  // Img
  sortUp = '../../../../assets/img/icons/arrowUp.png';
  sortDown = '../../../../assets/img/icons/arrowDown.png';
  favSelect = '../../../../assets/img/icons/favorite-notSelected.svg';
  favNotSelect = '../../../../assets/img/icons/favorite-selected.svg';


  
  isShow: boolean = true;
  isSelected: boolean = false;

  @Input() title: string;


  toggleDisplay() {
    this.isShow = !this.isShow;
    //console.log(this.project);
  }

  toggleFav() {
    this.isSelected = !this.isSelected;
  }

  ngOnInit() {
  

}

}




