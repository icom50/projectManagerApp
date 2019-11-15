import { Injectable, ɵConsole } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {

  projectsUser: Project[] = []

  current_user = "5da98631e2dcd109d6ab35db";
  // current_user = localStorage.getItem('current_user')

  constructor(public dataService?: DataService) {
    this.loadProject() 
  }

  loadProject(){
    return this.dataService
      .getProjectsByUser(this.current_user)
      .subscribe(data =>{
        this.projectsUser = data;
        return this.projectsUser
        //console.log(this.projectsUser)
    })
  }
  refreshProject(project_id:string){
    // return this.dataService
    //   .getProjectsByUser(this.current_user)
    //   .subscribe(data =>{
        let index = this.projectsUser.findIndex(project => project['_id'] === project_id )
        this.projectsUser.splice(index,1)
        return this.projectsUser
        //console.log(this.projectsUser)
    // })
  }
}
