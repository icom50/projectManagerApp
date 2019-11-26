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

  // addProjectToUser(project, user){ // se fait automatiquement au PUT & POST  --- A TESTER
  //     this.getUserById(user.user_id).subscribe(data => {
  //       let index;
  //       data['users'].projects.filter((pro, i) => {
  //         if (project._id === pro.project_id) return index = i
  //       })
  //       if (index === -1) data['users'].projects.push({project_id : project._id, accepted : false, invitedBy : project.author_id, tasks : []})
  //       // else project.tasks.map(task => this.addTaskToUser(project._id,task,user.user_id))
  //       this.postUser(data['users']).subscribe()
  //   })
  // }
  // private addTaskToUser(project_id, task, user_id){ // se fait automatiquement au PUT & POST --- A TESTER
  //   console.log("add task to user, bisou")
  //   this.getUserById(user_id).subscribe(data => {
  //     let index;
  //     data['users'].projects.map(project => {
  //       index = project.tasks.findIndex(t => (t === task._id))
  //       if (index === -1) data['users'].projects.filter(project =>{
  //         if (project.project_id === project_id) return project.tasks.push(task._id)
  //       })
  //     })
  //     this.postUser(data['users']).subscribe()
  //   })
  // }
  // private removeTaskToUser(project_id, task_id, user_id){
  //   this.restService.getUserById(user_id).subscribe(user => { // se fait automatiquement au PUT & POST --- A TESTER
  //     let index = user['users'].projects.findIndex(project => project['project_id'] === project_id );
  //     let yndex = user['users'].projects[index].tasks.findIndex(task => task === task_id );
  //     user['users'].projects[index].tasks.splice(yndex,1);
  //     this.restService.putUser(user['users']).subscribe()
  //   })
  // }
  // removeProjectToUser(project_id,user_id){
  //   this.restService.getUserById(user_id).subscribe(user => { // se fait automatiquement au PUT & POST --- A TESTER
  //     let index = user['users'].projects.findIndex(project => project.project_id === project_id )
  //     user['users'].projects.splice(index,1)
  //     this.restService.putUser(user['users']).subscribe()
  //   })
  // }



/* ------------------------------ /api/projects ----------------------------- */

  getProjects():Observable<Project[]>{
    return this.restService.getProjects()
  }

  getProjectById(id:string): Observable<Project>{
    return this.restService.getProjectById(id)
  }

  postProject(project:Project): Observable<Project>{ // TODO ajouter les users assignés dans users.projects --- A TESTER
    // this.getUserById(project.author_id).subscribe(user => {
    //   user['users'].projects.push({project_id : project._id, accepted : true, invitedBy : user['users']._id, tasks : []})
    //   this.putUser(user['users']).subscribe()
    // })
    // if (project.users) project.users.map(data => this.addProjectToUser(project, data))
    // this.restService.getUserById(project.author_id).subscribe(async (data) => {
    //   await project.users.push({
    //     user_id : project.author_id, role : "administrator", avatar_url : data['users'].avatar_url, email : data['users'].email, job : data['users'].job  
    //   })
    //   return project
    // })
    return this.restService.postProject(project)
    
  }

  putProject(project:Project): Observable<Project>{ // TODO ajouter les users assignés dans users.projects --- A TESTER
    console.log(project.users)
    // if (project.users.length > 0) project.users.map(data => this.addProjectToUser(project, data))

    this.currentProject = project;
    return this.restService.putProject(project)
  }

  setProject(project: Project) {
    this.currentProject = project;
    return this.currentProject;
  }

  deleteProject(id:string): Observable<Project>{ // TODO DELETER CHEZ L USER --- A TESTER
    // this.restService.getProjectById(id).subscribe(project => {
    //   // this.removeProjectToUser(id, project['projects'].author_id)
    //   project['projects'].users.map(user => {
    //     if(project['projects'].author_id != user.user_id) this.removeProjectToUser(id,user.user_id)
    //   })
    // })
    return this.restService.deleteProject(id)
  }
  
  putTaskByProject(project_id:string, task:Task) { // TODO ajouter les users assignés dans users.projects ***
    // console.log(project_id)
    // console.log(task)
    this.getProjectById(project_id).subscribe((data:Project) =>{
      let index;
      let project = data['projects'];
      if (task._id) index = project.tasks.findIndex(CurrentTask => CurrentTask['_id'] === task._id )
      // console.log(index)
      if (index === -1 || !(task._id) ) {
        project.tasks.push(task)
      } else {
        project.tasks.splice(index,1,task)
        // if (task.assigned) task.assigned.map(ass => this.addTaskToUser(project_id, task, ass['user_id']))
      }
      // if (task.assigned) task.assigned.map(ass => this.addTaskToUser(project_id, task, ass['user_id']))
      this.putProject(project).subscribe(data => {
        this.setProject(project);
      })
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
        // project.tasks[index].assigned.map(ass => this.removeTaskToUser(project_id,task_id, ass['user_id']))
        project.tasks.splice(index,1)
      }
      this.putProject(project).subscribe()
      
    }, error => error)
  }
  
<<<<<<< HEAD
  getTaskById(project_id:string, task_id:string): Observable<any> {
=======
  getTaskById(project_id:string, task_id:string): Observable<any>{
    //console.log(project_id);
    //console.log(task_id)
>>>>>>> ae53ba2f220e4edbb072a75769c116c6b3ae7743
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

  // getTasksByUser(user_id:string) : Observable<any[]>{ // MODIFIER POUR ALLER CHERCHER DANS L'USER ET NON DANS TOUS LESPROJETS
  // let output = []
  // return this.restService.getProjects().pipe(map((data) => {
  //   data['projects'].map(task => {
  //     return task.tasks.map(projectTask => {
  //       return projectTask.assigned.map((oneAssigned) => {
  //         if (oneAssigned.user_id === user_id || oneAssigned._id === user_id) return output.push({...projectTask, project_id: task._id})
  //       });
  //     });
  //     });
  //     return output;
  //   }))

  getTasksByUser(user_id:string) : Observable<any[]>{ // MODIFIER POUR ALLER CHERCHER DANS L'USER ET NON DANS TOUS LESPROJETS --- A TESTER

    // let output = []
    // return this.restService.getProjects().pipe(map((data) => {
    //   data['projects'].map(task => {
    //     return task.tasks.map(projectTask => {
    //       return projectTask.assigned.map((oneAssigned) => {
    //         if (oneAssigned.user_id === user_id || oneAssigned._id === user_id) return output.push({...projectTask, project_id: task._id})
    //       })
    //     })
    //   })
    //   return output
    // }))

    let output = [];

    return this.restService.getUserById(user_id).pipe(map(user => {
      // console.log(user);
      user['users'].projects.map(async project => {
        await project.tasks.map( task => {
          // console.log('task')
          // console.log(project)
          this.getTaskById(project.project_id,task).subscribe(task => output.push({...task, project_id : project.project_id, color : project.color}))
        })
      })
      return output
    }))
    // return this.restService.getUserById(user_id).subscribe(user =>{
    //   user['users'].projects.map(project => output.push(...project.tasks))
    //   return output
    // })    
  }

  getProjectsByUser(user_id:string): Observable<any[]>{ // MODIFIER POUR ALLER CHERCHER DANS L'USER ET NON DANS TOUS LESPROJETS -- A TESTER
    // let output = []
    // return this.restService.getProjects().pipe(map((data)=> {
    //   data['projects'].map(project => {
    //     return project.users.map(user =>{
    //       if (user._id === user_id || user.user_id === user_id) return output.push(project)
    //     })
    //   })
    //   return output
    // }))
    let output = []
    return this.restService.getUserById(user_id).pipe(map(data => { 
      data['users'].projects.map(project => {
        return this.getProjectById(project.project_id).subscribe(data => {
          // console.log(data['projects'])
          output.push(data['projects'])
        })
      })
      //console.log(output)
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
