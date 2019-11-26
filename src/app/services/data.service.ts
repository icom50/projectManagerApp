import { Injectable, ɵConsole } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project, Task } from '../models/projects.model';
import { User } from '../models/users.model';
import { AuthInterceptorService} from './auth-interceptor.service'
import { RestService } from './rest.service'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private restService: RestService) {}
  // change API's url HERE
  users: User[];
  user: User;
  projects: Project[];
  project: Project;
  currentProject: Project;

/* ------------------------------- /api/users ------------------------------- */

  getUsers():Observable<User[]>{
    return this.restService.getUsers()
  }

  getUserById(id:string): Observable<User>{
    return this.restService.getUserById(id)
  }

  getUserByEmail(email:string): Observable<User>{
    return this.restService.getUserByEmail(email)
  }

/* -------------------------------- /api/user ------------------------------- */

  getUserSecure(id:string): Observable<User>{
    return this.restService.getUserSecure(id)
  }

  postUser(user:User): Observable<User>{
    return this.restService.postUser(user)
  }

  putUser(user:User): Observable<User>{
    return this.restService.putUser(user)
  }

  deleteUser(id:string): Observable<User>{
    return this.restService.deleteUser(id)
  }

  loginUser(user:User): Observable<User>{
    return this.restService.loginUser(user)
  }

  postForgottenPassword(email:string){
    return this.restService.postForgottenPassword(email)
  }

  removeTaskToUser(project_id, task_id, user_id){
    this.restService.getUserById(user_id).subscribe(user => { 
      let pIndex = user['users'].projects.findIndex(project => project['project_id'] === project_id );
      console.log(pIndex)
      let tIndex = user['users'].projects[pIndex].tasks.findIndex(task => task === task_id );
      console.log(task_id)
      console.log(tIndex)
      console.log(user['users'].projects[pIndex].tasks[tIndex])
      user['users'].projects[pIndex].tasks.splice(tIndex,1);
      console.log(user['users'].projects[pIndex].tasks[tIndex])
      this.restService.putUser(user['users']).subscribe()
    })
  }




/* ------------------------------ /api/projects ----------------------------- */

  getProjects():Observable<Project[]>{
    return this.restService.getProjects()
  }

  getProjectById(id:string): Observable<Project>{
    return this.restService.getProjectById(id)
  }

  postProject(project:Project): Observable<Project>{ // TODO ajouter les users assignés dans users.projects --- A TESTER
    return this.restService.postProject(project)
  }

  putProject(project:Project): Observable<Project>{ // TODO ajouter les users assignés dans users.projects --- A TESTER
    // this.setProject(project)
    console.log('coucou')
    console.log(project)
    return this.restService.putProject(project)
  }

  setProject(project: Project) {
    this.currentProject = project;
    return this.currentProject;
  }

  deleteProject(id:string): Observable<Project>{ // TODO DELETER CHEZ L USER --- A TESTER
    return this.restService.deleteProject(id)
  }
  
  putTaskByProject(project_id:string, task:Task) { // TODO ajouter les users assignés dans users.projects ***

    this.getProjectById(project_id).subscribe((data:Project) =>{
      let index;
      let project = data['projects'];
      if (task._id) index = project.tasks.findIndex(CurrentTask => CurrentTask['_id'] === task._id )
      if (index === -1 || !(task._id) ) {
        project.tasks.push(task)
      } else {
        project.tasks.splice(index,1,task)
      }
      this.putProject(project).subscribe(data => {
        this.setProject(project);
      },err => console.log(err))
    }, error => console.log(error))
  }

  deleteTaskByProject(project_id:string, task_id:string){ // DELETER CHEZ L USER --- A TESTER
    this.getProjectById(project_id).subscribe((data:Project)=>{
      let project = data['projects'];
      let index;
      if (task_id) index = project.tasks.findIndex(CurrentTask => CurrentTask['_id'] === task_id )
      if (index === -1 || !(task_id) ) {
        console.log('this task no longer exist or has never existed')
      } else {
        project.tasks[index].assigned.map( ass => this.removeTaskToUser(project._id, task_id,ass.user_id))
        project.tasks.splice(index,1)
      }
      this.putProject(project).subscribe()
      
    }, error => error)
  }
  
  getTaskById(project_id:string, task_id:string): Observable<any>{
    return this.restService.getProjectById(project_id).pipe(map(data => {
      let output =  data['projects'].tasks.filter( task => (task._id === task_id))[0]
      output = {...output, color : data['projects'].color }
      return output
    }))
  }

  getTasksByProject(project_id:string): Observable<any[]>{
    return this.restService.getProjectById(project_id).pipe(map(data => {
      return data['projects'].tasks.map(task => task)
    }))
  }

  getUsersByProject(project_id:string): Observable<any[]>{ 
    return this.restService.getProjectById(project_id).pipe(map(data => {
      return data['projects'].users.map(user => user)
    }))
  }


  getTasksByUser(user_id:string) : Observable<any[]>{ // MODIFIER POUR ALLER CHERCHER DANS L'USER ET NON DANS TOUS LESPROJETS --- A TESTER
    let output = [];

    return this.restService.getUserById(user_id).pipe(map(user => {
      user['users'].projects.map(project => {
        project.tasks.map(task => {
          this.getTaskById(project.project_id,task).subscribe(task => output.push({...task, project_id : project.project_id}))
        })
      })
      return output
    }))
  }

  getProjectsByUser(user_id:string): Observable<any[]>{ // MODIFIER POUR ALLER CHERCHER DANS L'USER ET NON DANS TOUS LESPROJETS -- A TESTER
    let output = []
    return this.restService.getUserById(user_id).pipe(map(data => { 
      data['users'].projects.map(project => {
        return this.getProjectById(project.project_id).subscribe(data => {
          output.push(data['projects'])
        })
      })
      return output
    }))
  }

  getTasksByProjectAndUser(project_id: string, user_id:string): Observable<any[]>{ // MODIFIER POUR ALLER CHERCHER DANS L'USER ET NON DANS TOUS LESPROJETS
    let output = []
    return this.restService.getProjectById(project_id).pipe(map(data => {
      data['projects'].tasks.map(task => {
        return task.assigned.map(oneAssigned =>{
          if (oneAssigned.user_id === user_id || oneAssigned._id === user_id) output.push(task)
        })
      })
      return output
    }))
  }
}
