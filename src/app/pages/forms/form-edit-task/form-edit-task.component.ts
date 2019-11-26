// import { PageProjectComponent } from './../../../../../../task-manager/src/app/pages/page-project/page-project.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/users.model';
import { Project, Task } from '../../../models/projects.model';
import { DataService } from '../../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
// import { PageProjectComponent } from '../../page-project/page-project.component';



@Component({
  selector: 'app-form-edit-task',
  templateUrl: './form-edit-task.component.html',
  styleUrls: ['./form-edit-task.component.scss']
})

export class FormEditTaskComponent implements OnInit {

  project: Project;
  task: Task;
  editTask: FormGroup;
  user: User;
  creator: string;

  emails = []
  memberAssigned;
  memberAssignedAll = [];
  newAssigned = [];
  tempUser = [];
  faTrash = faTrash;
  addCheckList;
  otherTemp;
  avatarTemp = [];
  exportTab = [];
  newComments = [];
  tempComm = [];
  showUsersComm = [];
  task_id;
  current_user: String;
  resetFieldComment;



  constructor(
    private _dataService: DataService,
    private route: Router,
    public dialogRef: MatDialogRef<FormEditTaskComponent>,
    // public pageProject: PageProjectComponent,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  async updateTask(){
    this.task = this.editTask.value;
    this.task.assigned = this.newAssigned;
    await this._dataService.putTaskByProject(this.project._id, this.task);
    await this._dataService.setProject(this.project);
  }
  async onSubmit(e) {
    event.preventDefault()
    // console.log(this.project)
    if (this.editTask.invalid) {
      event.preventDefault()
    }
    else {
      await this.updateTask()
      await this.dialogRef.close(FormEditTaskComponent);
    }
  }

  addAssignedUser(user) {
    let mail = user.email;

    if (!(this.checkAssigned(mail))) {

      this._dataService.getUserByEmail(mail).subscribe((data: User) => {

        let index = this.newAssigned.findIndex(ass => {
          return ass.user_id === data['users']._id;
        });

        // console.log(index);

        if (index === -1) {
          this.newAssigned.push({ avatar_url: data['users'].avatar_url, user_id: data['users']._id });
          this.updateTask()
        }
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

    let index = this.newAssigned.findIndex(ass => ass.user_id === id);

    // console.log(index);
    // console.log(this.newAssigned)
    this._dataService.removeTaskToUser(this.project._id, this.data.task_id, id)
    if (index != -1) {
      this.newAssigned.splice(index, 1);
      this.updateTask()
      // console.log('deleted')
    }
  }

  addToCheckList() {
    this.task.checklist.push({ name: this.addCheckList, done: false });
    this.addCheckList = '';
  }

  removeFromChecklist(i) {
    event.preventDefault()
    this.task.checklist.splice(i, 1)
  }

  addComment(currentComment) {
    this.task.comments.push({comment: currentComment, author_id: this.current_user});
    // console.log(this.resetFieldComment)
    this.resetFieldComment = '';
    // this._dataService.putTaskByProject(this.project._id, this.task);
    // dataservice pas forcément utile
  }

  removeComment(index) {
    this.task.comments.splice(index, 1);
  }

  deleteTask() {
    event.preventDefault()
    if (confirm("Are you sur to delete this project")) {
      // console.log('project deleted')
      this._dataService.deleteTaskByProject(this.project._id, this.data.task_id)

      // this.closePopup();
    }
    else {
      // console.log('project not deleted')
    }

  }

  isClicked(index) {
    this.task.checklist[index]['done'] = !this.task.checklist[index]['done'];
  }

  closePopup() {
    this.dialogRef.close(FormEditTaskComponent);
  }

  ngOnInit() {

    this.current_user = localStorage.getItem('current_user');

    this._dataService.getProjectById(this.data.project_id).subscribe((data: Project) => {
      this.project = data['projects'];
      for (let i = 0; i < this.project.users.length; i++) {
        this._dataService.getUserById(this.project.users[i].user_id).subscribe((data: User) => {
          this.emails.push(data['users'].email);
        }, err => console.log(err));
      }

    })



    this._dataService.getTaskById(this.data.project_id, this.data.task_id).subscribe((data: Task) => {
      this.task = data;
      this.newAssigned = data.assigned || [];
      this.newComments = data.comments || [];

      this.editTask.setValue(this.task)

      //list all members assigned to the task and stock it in temp table
      for (let i = 0; i < this.newAssigned.length; i++) {
        this.tempUser.push(this.newAssigned[i]);
      }

      for (let j = 0; j < this.newComments.length; j++) {
        this.tempComm.push(this.newComments[j]);
      }


      // loop on each member
      const names = this.tempUser.map(el => {

        //get his data by id
        this._dataService.getUserById(el.user_id).subscribe(data => {

          if (data['users'].firstname != '' || data['users'].lastname != '') {
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

      //used to get and show user who commented
      const personsComm = this.tempComm.map(person => {
        this._dataService
        .getUserById(person.author_id)
        .subscribe(data => {

          if(data['users'].firstname != '' || data['users'].lastname != '') {
            //push the data in other temp table
            this.showUsersComm.push(`${data['users'].firstname} ${data['users'].lastname}`);
          } else {
            this.showUsersComm.push(data['users'].email.split('@')[0]);
          }
        })
      });

      this._dataService.getUserById(this.task.author_id).subscribe((data: User) => {

        if (data['users'].username) {
          this.creator = data['users'].username;
        }
        else {
          this.creator = data['users'].email;
        }
      });
    });

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
      _id: new FormControl(),
      color: new FormControl()
    });
  }
}
