import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/projects.model';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-common-task',
  templateUrl: './common-task.component.html',
  styleUrls: ['./common-task.component.scss']
})
export class CommonTaskComponent implements OnInit {


  check = faCheckSquare;

  favNotSelected = '../../../../assets/img/icons/favorite-notSelected.svg';
  favSelected = '../../../../assets/img/icons/favorite-selected.svg';

  task: Task;

  @Input() project_id : string;
  @Input() task_id : string;

  constructor(private _dataService : DataService) { console.log('common task component')}

  ngOnInit() {
    console.log('project_id')
    console.log(this.project_id)
    console.log('----------')
    console.log('task_id')
    console.log(this.task_id)
    console.log('----------')
    this._dataService.getTaskById(this.project_id, this.task_id)
    .subscribe((data: Task)=>{
      this.task = data;
      console.log('---- CONSOLE LOG POUR ROMAIN ----')
      console.log(this.task)
      console.log('---- CONSOLE LOG POUR ROMAIN ----')
    })
  }

}
