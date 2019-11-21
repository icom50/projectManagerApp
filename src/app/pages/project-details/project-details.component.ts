import { Component, OnInit, Inject } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsDataService } from 'src/app/services/projects-data.service';
import { User } from 'src/app/models/users.model';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project 
  isPrivate: String;
  formComment : FormGroup;
  commentValue: string;
  faPlus = faPlus;
  email:string;
  msgError:string;
  isShow:boolean=false;

  constructor(private _dataService : DataService, 
    private fb : FormBuilder, 
    private nav : NavbarService,  
    public dialogRef: MatDialogRef<ProjectDetailsComponent>, 
    @Inject(MAT_DIALOG_DATA) 
    public data: any,
    public _projectData : ProjectsDataService
    ) {
    this.formComment = this.fb.group({
      comment : new FormControl(null, [Validators.maxLength(400)])
    })
   }

  deleteProject()  {
    {
      if (confirm("Are you sur to delete this project")) {
        console.log('project deleted')
        this._dataService.deleteProject(this.data.project_id).subscribe();
      }
      else {
        console.log('project not deleted')
      }
    }
      
   }

  //  addComment(){
  //    this.formComment.reset();
     
  //  }

  addMembers(email){
      this._dataService.getUserByEmail(email).subscribe(res => {
      let user = res['users'];
      let index: number;
      //index = user.email.findIndex(currentEmail => currentEmail['email'] === user.email);
      //index = this.project.users.findIndex(currentEmail => currentEmail['email'] === user._id);
      //console.log(this.project.users)
     
      index = this.project.users.findIndex(currentEmail => currentEmail.email === user.email);
      if(index === -1){
        this.project.users.push({
          user_id: user._id,
          job: user.job,
          role: "administrator",
          avatar_url : user.avatar_url,
          email: user.email
        });
        this._dataService.putProject(this.project).subscribe();
   
      }else{
        //console.log("Cette personne existe déjà dans le projet");
        
        console.log(this.email = "hey");
        this.isShow = true;
        this.msgError = "Cette personne existe déjà dans le projet";
       
      }
      //console.log(user);
      //console.log(this.project['users']);
      //console.log(user._id);
    }, err =>{
      //console.error("This email doesn't exist");
      this.isShow = true;
      this.msgError = "This email doesn't exist";
    
    });
    
  }

  ngOnInit() {
    this._dataService.getProjectById(this.data.project_id).subscribe((data : Project)=>{
      this.project = data['projects'];
      this.isPrivate = this.project.is_private  ? "the project is in private" : "The project is in public";
    })
  }
}
