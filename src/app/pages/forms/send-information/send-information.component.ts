import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send-information',
  templateUrl: './send-information.component.html',
  styleUrls: ['./send-information.component.scss']
})
export class SendInformationComponent implements OnInit {
  email;
  constructor(
    private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.email = this.route.snapshot.params.email;
  }

}
