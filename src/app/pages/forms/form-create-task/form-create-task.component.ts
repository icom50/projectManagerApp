import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../models/users.model';
import { Project } from '../../../models/projects.model';
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
  newTask = { assigned: [], checklist: [] }
  user_id = "5da98631e2dcd109d6ab35db";
  project_id = "5daec4f318f7f705f803cbe8";
  constructor(
    private _dataService: DataService,
    private nav: NavbarService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormCreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // @Input("user_id") user_id // <app-form-create-task [user_id]="id" [project_id]="project._id">
    // @Input("project_id") project_id 
  }

  createTask(f) {
    event.preventDefault()
    f.value.checklist = this.newTask.checklist
    f.value.assigned = this.newTask.assigned
    // Update the project before saving for not erasing new datas
    console.log(this.project.tasks)
    // this._dataService.getProjectById(this.project_id).subscribe((data:Project) =>{
    //   this.project = data['projects'];
    //   this.project.tasks.push(f.value)
    //   this._dataService.putProject(this.project).subscribe()
    // })
    console.log(this.newTask)
    this._dataService.putTaskByProject(this.project_id, f.value)


  }
  addAssignedUser(id) {
    event.preventDefault()
    if (id != "Assign a member" && !(this.checkAssigned(id))) {
      this._dataService.getUserById(id).subscribe((data: User) => {
        this.newTask.assigned.push({ ...data['users'], user_id: data['users']._id })
        console.log(this.newTask)
      })
    }
  }
  checkAssigned(id) {
    return this.newTask.assigned.some((el) => {
      return el.user_id === id;
    });
  }
  addToCheckList(i: NgForm) {
    event.preventDefault()
    let name = i.value
    console.log(i.value)
    this.newTask.checklist.push({ name, done: false })
    // i.controls.value.reset
  }
  ngOnInit() {
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
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      confirmPassword: ['', Validators.required],
    }, {});

  }
}
