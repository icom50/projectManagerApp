import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.scss']
})
export class ZippyComponent implements OnInit {

  
  constructor() { }

  
  isShow: boolean = true;

  @Input() title: string;
  @Input() projects;
 
  
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  ngOnInit() {
    
    

}

}




