import { Component, OnInit, Inject } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project : Project;
  isPrivate: String;
  formComment : FormGroup;
  commentValue: string;

  constructor(private _dataService : DataService, private fb : FormBuilder, private router : Router, private route : ActivatedRoute, private nav : NavbarService,  public dialogRef: MatDialogRef<ProjectDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formComment = this.fb.group({
      comment : new FormControl(null, [Validators.maxLength(400)])
    })
   }

  deleteProject(id)  {
     this._dataService.deleteProject(id).subscribe((data:Project)=>{
       this.project = data;
       this.router.navigate(['/home'])
     });
     setTimeout(()=>{
      alert('Project deleted');
     },1000)
      
   }

  //  addComment(){
  //    this.formComment.reset();
     
  //  }

   

  ngOnInit() {
    //const id = this.route.snapshot.params.id;
    this._dataService.getProjectById(this.data.project_id).subscribe((data : Project)=>{
      this.project = data['projects'];
      console.log(this.project)
      this.isPrivate = this.project.is_private  ? "the project is in private" : "The project is in public";
    })
  }
}
