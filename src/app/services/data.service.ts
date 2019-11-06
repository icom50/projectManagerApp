import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/projects.model';
import { User } from '../models/users.model';
import { RestService } from './rest.service'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private restService: RestService) {}
  // change API's url HERE
  url:string = 'http://localhost:8001/';
  urlUsers:string = `${this.url}api/users/`;
  urlUser:string = `${this.url}api/user/`;
  urlProjects:string = `${this.url}api/projects/`;

  // /api/users
  getUsers():Observable<User[]>{
    return this.restService.getUsers()
  }
  getUserById(id:string): Observable<User>{
    return this.restService.getUserById(id)
  }
  getUserByEmail(email:string): Observable<User>{
    return this.restService.getUserByEmail(email)
  }

  // /api/user
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
  //devrait renvoyer un Token, mais inutile pour le moment
  loginUser(user:User): Observable<User>{
    return this.restService.loginUser(user)
  }

  // /api/projects
  getProjects():Observable<Project[]>{
    return this.restService.getProjects()
  }
  getProjectById(id:string): Observable<Project>{
    return this.restService.getProjectById(id)
  }
  postProject(project:Project): Observable<Project>{
    return this.restService.postProject(project)
  }
  putProject(project:Project): Observable<Project>{
    return this.restService.putProject(project)
  }
  deleteProject(id:string): Observable<Project>{
    return this.restService.deleteProject(id)
  }
  
  getTaskById(project_id:string, task_id:string): Observable<any>{
    return this.restService.getProjectById(project_id).pipe(map(data => {
      return data['projects'].tasks.filter( task =>  (task._id === task_id))[0]
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
  getTasksByUser(user_id:string) : Observable<any[]>{
    let output = []
    return this.restService.getProjects().pipe(map((data) => {
      data['projects'].map(task => {
        return task.tasks.map(projectTask => {
          return projectTask.assigned.map((oneAssigned) => {
            if (oneAssigned.user_id === user_id || oneAssigned._id === user_id) return output.push({...projectTask, project_id: task._id})
          })
        })
      })
      return output
    }))    
  }
  getProjectsByUser(user_id:string): Observable<any[]>{
    let output = []
    return this.restService.getProjects().pipe(map((data)=> {
      data['projects'].map(project => {
        return project.users.map(user =>{
          if (user._id === user_id || user.user_id === user_id) return output.push(project)
        })
      })
      return output
    }))
  }
  getTasksByProjectAndUser(project_id: string, user_id:string): Observable<any[]>{
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
