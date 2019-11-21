import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/projects.model';

@Component({
  selector: 'app-common-task',
  templateUrl: './common-task.component.html',
  styleUrls: ['./common-task.component.scss']
})
export class CommonTaskComponent implements OnInit {


  task: Task;

  @Input() project_id : string;
  @Input() task_id : string;

  constructor(private _dataService : DataService) { }

  ngOnInit() {
    this._dataService.getTaskById( this.project_id, this.task_id)
    .subscribe((data: Task)=>{
      this.task = data;
    })
  }

}
