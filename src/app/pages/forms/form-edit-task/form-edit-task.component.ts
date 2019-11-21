import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/users.model';
import { Project, Task } from '../../../models/projects.model';
import { DataService } from '../../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-form-edit-task',
  templateUrl: './form-edit-task.component.html',
  styleUrls: ['./form-edit-task.component.scss']
})

export class FormEditTaskComponent implements OnInit {

  project: Project;
  task: Task;
  editTask: FormGroup;
  emails = []
  memberAssigned;
  memberAssignedAll = [];
  tempUser = [];
  faTrash = faTrash;
  addCheckList;
  user: User;
  creator: string;
  otherTemp;
  avatarTemp = [];
  exportTab = [];

  constructor(
    private _dataService: DataService,
    public dialogRef: MatDialogRef<FormEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onSubmit(e) {
    console.log(this.project)
    if (this.editTask.invalid) {
      e.preventDefault()
    }
    else {
      this.task = this.editTask.value;
      this._dataService.putTaskByProject(this.project._id, this.task);
    }
  }

  addAssignedUser(email) {
    if (!(this.checkAssigned(email))) {

      this._dataService.getUserByEmail(email).subscribe((data: User) => {
        this.task.assigned.push({ ...data['users'], avatar_url: data['users'].avatar_url })
      })
    }
  }

  checkAssigned(email) {
    return this.task.assigned.some((el) => {
      return el['email'] === email;
    });
  }

  unnasignedUser(id) {
    event.preventDefault();
    let index = this.task.assigned.indexOf({ user_id: id });
    this.task.assigned.splice(index, 1)
  }

  addToCheckList() {
    this.task.checklist.push({ name: this.addCheckList, done: false });
    this.addCheckList = '';
  }

  removeFromChecklist(i) {
    event.preventDefault()
    this.task.checklist.splice(i, 1)
  }


  deleteTask() {
    event.preventDefault()
    if (confirm("Are you sur to delete this project")) {
      console.log('project deleted')
      this._dataService.deleteTaskByProject(this.project._id, this.task._id)
    }
    else {
      console.log('project not deleted')
    }
    
  }

  isClicked(index){
    this.task.checklist[index]['done'] = !this.task.checklist[index]['done'];
  }


  ngOnInit() {
    this._dataService.getProjectById(this.data.project_id).subscribe((data: Project) => {
      this.project = data['projects'];
      for (let i = 0; i < this.project.users.length; i++) {
        this._dataService.getUserById(this.project.users[i]._id).subscribe((data: User) => {
          this.emails.push(data['users'].email);
        });
      }

    })



    this._dataService.getTaskById(this.data.project_id, this.data.task_id).subscribe((data: Task) => {
      this.task = data;
      this.editTask.setValue(this.task)
      //list all members assigned to the task and stock it in temp table
      for (let i = 0; i < this.task.assigned.length; i++) {
        this.tempUser.push(this.task.assigned[i]);
      }

      // loop on each member
      const names = this.tempUser.map(el => {

        //get his data by id
        this._dataService.getUserById(el.user_id).subscribe(data => {

          if(data['users'].firstname != '' || data['users'].lastname != '') {
            //push the data in other temp table
            this.memberAssignedAll.push(`${data['users'].firstname} ${data['users'].lastname}`);
          } else {
            this.memberAssignedAll.push(data['users'].email.split('@')[0]);
          }

          this.avatarTemp.push(data['users'].avatar_url);
        });

        this.exportTab = [this.memberAssignedAll, this.avatarTemp];
        return this.exportTab;
      });

      //otherTemp is used to get value outside dataservice
      this.otherTemp = names[0]; 

      this._dataService.getUserById(this.task.author_id).subscribe((data: User) => {
        if (data['users'].username) {
          this.creator = data['users'].username;
        }
        else {
          this.creator = data['users'].email;
        }
      })
    })

    this.editTask = new FormGroup({
      name: new FormControl('', Validators.required),
      estimated: new FormControl(),
      deadline: new FormControl(),
      priority: new FormControl(),
      author_id: new FormControl(),
      description: new FormControl(),
      total_time: new FormControl(),
      status: new FormControl(),
      progression: new FormControl(),
      assigned: new FormControl(),
      attachments: new FormControl(),
      labels: new FormControl(),
      comments: new FormControl(),
      checklist: new FormControl(null),
      _id: new FormControl()

    });
  }
}
