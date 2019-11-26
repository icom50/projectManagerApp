import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/users.model';
import { Task } from 'src/app/models/projects.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormEditTaskComponent } from '../forms/form-edit-task/form-edit-task.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  user: User;
  tasks: Task[];

  constructor(
    private nav: NavbarService,
    private _dataService: DataService,
    private dialog: MatDialog,
    private route: Router
  ) { }

  openPopup(index) {
    const dialogRef = this.dialog.open(FormEditTaskComponent, {
      width: '1000px',
      data: {
        task_id: this.tasks[index]._id,
        project_id: this.tasks[index]['project_id']
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('popup closed');
    })
  }

  router(id) {
    event.stopPropagation();
    this.route.navigate(['/project/' + id])
  }

  ngOnInit() {
    this.nav.show();
    const id = localStorage.getItem('current_user');
    //console.log(id)

    this._dataService.getUserById(id).subscribe((data: User) => {
      this.user = data['users'];
      this._dataService.getTasksByUser(id)
        .subscribe((data: Task[]) => {
          this.tasks = data;
          //console.log('-------task -----')
          //console.log(this.tasks);
          // console.log(this.user);
        })
    })
  }
}
