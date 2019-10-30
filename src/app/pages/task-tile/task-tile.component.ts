import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})

export class TaskTileComponent implements OnInit {

  @Input("task") task: any;

  constructor() { }

  ngOnInit() {

  }
}
