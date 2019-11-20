import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../models/users.model';
import { Project, Task } from '../../../models/projects.model';
import { DataService } from '../../../services/data.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-create-task',
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.scss']
})
export class FormCreateTaskComponent implements OnInit {
  user: User;
  users: User[];
  project: Project;
  formCreateTask: FormGroup;
  task : Task;
  //newTask = { assigned: [], checklist: [] }
  user_id = "5da98631e2dcd109d6ab35db";
  project_id = this.data.project_id;
  selected = 'none';
  constructor(
    private _dataService: DataService,
    private nav: NavbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormCreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  createTask() {
    event.preventDefault()
    this.task = this.formCreateTask.value;
    this._dataService.putTaskByProject(this.project_id, this.task);
    console.log(this.task)
  }

  getErrorMessage(field: string): string {
    const error = {
      required: "This field is required",
      maxlength: "This field is too small for this content"
    };
    let returnValue = '';
    Object.keys(this.formCreateTask.controls[field].errors).map((key, index) => {
      returnValue += `${error[key]}`;
    })
    return returnValue;
  }

  // addAssignedUser(id) {
  //   event.preventDefault()
  //   if (id != "Assign a member" && !(this.checkAssigned(id))) {
  //     this._dataService.getUserById(id).subscribe((data: User) => {
  //       this.newTask.assigned.push({ ...data['users'], user_id: data['users']._id })
  //       console.log(this.newTask)
  //     })
  //   }
  // }
  // checkAssigned(id) {
  //   return this.newTask.assigned.some((el) => {
  //     return el.user_id === id;
  //   });
  // }
  // addToCheckList(i: NgForm) {
  //   event.preventDefault()
  //   let name = i.value
  //   console.log(i.value)
  //   this.newTask.checklist.push({ name, done: false })
  //   // i.controls.value.reset
  // }
  ngOnInit() {
    const id = localStorage.getItem('current_user');
    //const id = this.user_id;
    this._dataService.getProjectById(this.project_id).subscribe((data: Project) => {
      this.project = data['projects'];
      console.log(this.project)
    })
    this._dataService.getUsersByProject(this.project_id).subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users)
    })


    this.formCreateTask = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(250)]],
      author_id: [id],
      estimated: [''],
      deadline: [''],
      priority: [this.selected],
      labels: [[]],
      assigned : [[]],
      checklist : [[]],
      progression : [''],
      attachments: [[]],
      comments : [[]]
    }, {});

  }
}
