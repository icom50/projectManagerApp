import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../models/users.model';
import { Project, Task } from '../../../models/projects.model';
import { DataService } from '../../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
// import { PageProjectComponent } from '../../page-project/page-project.component';
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
    // public _projectComponent: PageProjectComponent,
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

      // this.project.tasks.filter((task, i) => {
      //   if (task._id === this.task._id) {
      //     this._projectComponent.projects.task[i] = this.task; 
      //   } 
      // });
    }
  }

  addAssignedUser(email) {
    //console.log(email)
    //event.preventDefault()
    if (!(this.checkAssigned(email))) {

      this._dataService.getUserByEmail(email).subscribe((data: User) => {
        //console.log(this.task.assigned)
        this.task.assigned.push({ ...data['users'], avatar_url: data['users'].avatar_url })
        //console.log(this.task.assigned)
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
    //console.log(id)
  }

  addToCheckList() {
    //console.log(this.addCheckList);
    this.task.checklist.push({ name: this.addCheckList, done: false });
    //console.log(this.task.checklist);
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
    // console.log(this.task.checklist[index]['done']);
    this.task.checklist[index]['done'] = !this.task.checklist[index]['done'];
    // console.log(this.task.checklist[index]['done']);
  }


  ngOnInit() {
    //const id = localStorage.getItem('current_user');
    // console.log(this.data.project_id)
    // console.log(this.data.task_id)
    this._dataService.getProjectById(this.data.project_id).subscribe((data: Project) => {
      this.project = data['projects'];
      // console.log(this.project.tasks);
      for (let i = 0; i < this.project.users.length; i++) {
        this._dataService.getUserById(this.project.users[i]._id).subscribe((data: User) => {
          // console.log(data);
          this.emails.push(data['users'].email);
          //console.log(this.emails);
        });
      }
      //console.log(this.emails);
    })



    this._dataService.getTaskById(this.data.project_id, this.data.task_id).subscribe((data: Task) => {
      this.task = data;
      // console.log(this.task.checklist)
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
