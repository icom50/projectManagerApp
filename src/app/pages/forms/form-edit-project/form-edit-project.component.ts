import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Project } from 'src/app/models/projects.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-edit-project',
  templateUrl: './form-edit-project.component.html',
  styleUrls: ['./form-edit-project.component.scss']
})
export class FormEditProjectComponent implements OnInit {

  project : Project;
  editProject : FormGroup;
  date = Date.now();
  addColor;
  error : boolean = false;

  constructor(private _dataService : DataService, 
    public dialogRef: MatDialogRef<FormEditProjectComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

   }

   get f() { return this.editProject.controls; }

   getErrorMessage(field:string): string {
     const errors = {
      required : 'this field is required',
      maxlength : 'the content is too big'
     }
     let returnValue ='';
    Object.keys(this.editProject.controls[field].errors).map(key=>{
      returnValue += `${errors[key]}`;
    })
    return returnValue;
   }

   updateColor(value){
     if(value == '#ffffff'){
      event.preventDefault()
      this.error = true;
     }
     else{
       this.error = false;
      this.editProject.controls['color'].patchValue(value);
     }
    
   }

   onSubmit(){
    event.preventDefault()
    this.project = this.editProject.value;
    
    this._dataService.putProject(this.project).subscribe((data : Project) => {
      this.project = data['projects'];
      console.log(this.project)
      
    })
   }
   ProjectFinished(){
     if(this.project.status === 'finished'){
       return this.date;
     }
   }
   closePopup() {
    this.dialogRef.close(FormEditProjectComponent);
  }

  ngOnInit() {
    

    const id = this.data.project_id;
    this._dataService.getProjectById(id).subscribe((data : Project)=>{
      this.project = data['projects'];
      this.editProject.patchValue(this.project)
    })
    this.editProject = new FormGroup({
      name: new FormControl('',Validators.required),
      description: new FormControl('', Validators.maxLength(500)),
      git: new FormControl(),
      color: new FormControl(),
      author_id: new FormControl(),
      creation_date: new FormControl(),
      start_date: new FormControl(),
      finish_date: new FormControl(),
      deadline: new FormControl(),
      status: new FormControl(),
      users:new FormControl(),
      comments: new FormControl(),
      attachments: new FormControl(),
      ressources: new FormControl(),
      tasks: new FormControl(),
      _id: new FormControl(),
      is_private: new FormControl()
    });
  }
  
}