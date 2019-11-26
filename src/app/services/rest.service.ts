import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/projects.model';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  current_user;
  token;
  headers;
  constructor(private http: HttpClient) {
    this.setToken()
  }
  // change API's url HERE
  url: string = 'http://localhost:8001/';
  urlUsers: string = `${this.url}api/users/`;
  urlUser: string = `${this.url}api/user/`;
  urlProjects: string = `${this.url}api/projects/`;


  private setToken() {
    this.current_user = localStorage.getItem('current_user')
    this.token = localStorage.getItem("id_token")
    if (this.token != null) {
      this.headers = new HttpHeaders({
        "Authorization": `Bearer ${this.token}`,
        "content-type": "application/json"

      })
    } else {
      this.headers = new HttpHeaders({
        "content-type": "application/json"
      })
    }
  }

  // /api/users
  getUsers(): Observable<User[]> {
    this.setToken()
    return this.http.get(this.urlUsers, { headers: this.headers }).pipe(map(data => data as User[]))
  }
  getUserById(id: string): Observable<User> {
    this.setToken()
    return this.http.get(`${this.urlUsers}${id}`, { headers: this.headers }).pipe(map(data => data as User))
  }
  getUserByEmail(email: string): Observable<User> {
    this.setToken()
    return this.http.get(`${this.urlUsers}email/${email}`, { headers: this.headers }).pipe(map(data => data as User))
  }

  // /api/user
  getUserSecure(id: string): Observable<User> {
    this.setToken()
    return this.http.get(`${this.urlUser}${id}`, { headers: this.headers }).pipe(map(data => data as User))
  }
  postUser(user: User): Observable<User> {
    // const headers = new HttpHeaders().set('content-type','application/json');
    this.setToken()
    return this.http.post(`${this.urlUser}`, user, { headers: this.headers });
  }
  putUser(user: User): Observable<User> {
    // const headers = new HttpHeaders().set('content-type','application/json');
    this.setToken()
    return this.http.put(`${this.urlUser}${user._id}`, user, { headers: this.headers })
  }
  deleteUser(id: string): Observable<User> {
    // const headers = new HttpHeaders().set('content-type','application/json');
    this.setToken()
    return this.http.delete(`${this.urlUser}${id}`, { headers: this.headers })
  }

  loginUser(user: User): Observable<User> {
    // const headers = new HttpHeaders().set('content-type','application/json');
    // const headers = new HttpHeaders({"content-type":"application/json"});
    this.setToken()
    const token = this.http.post(`${this.urlUser}login`, user, { headers: this.headers });
    //not a token anymore
    return token;
    // can't use shareReplay() - do not seem to be a big issue
  }
  postForgottenPassword(email) {
    this.setToken()
    return this.http.post(`${this.urlUser}forgottenpassword`, { email: email }, { headers: this.headers })
  }

  // /api/projects
  getProjects(): Observable<Project[]> {
    // const bearerToken = localStorage.getItem('id_token');
    // console.log('ci dessous, un token ourseur')
    // console.log(localStorage);
    // const headers = new HttpHeaders().set('authorization' , bearerToken)
    // const headers = new HttpHeaders().set('content-type','application/json');
    this.setToken()
    return this.http.get(this.urlProjects, { headers: this.headers }).pipe(map(data => data as Project[]))
  }
  getProjectById(id: string): Observable<Project> {
    this.setToken()
    return this.http.get(`${this.urlProjects}${id}`, { headers: this.headers }).pipe(map(data => data as Project))
  }
  postProject(project: Project): Observable<Project> {
    // const headers = new HttpHeaders().set('content-type','application/json');
    this.setToken()
    return this.http.post(`${this.urlProjects}`, project, { headers: this.headers });
  }
  putProject(project: Project): Observable<Project> {
    // const headers = new HttpHeaders().set('content-type','application/json');
    //console.log(`${this.urlProjects}${project._id}`)
    //console.log(project)
    //console.log({...project})
    this.setToken()
    return this.http.put(`${this.urlProjects}${project._id}`, project, { headers: this.headers })
  }
  deleteProject(id: string): Observable<Project> {
    // const headers = new HttpHeaders().set('content-type','application/json');
    this.setToken()
    return this.http.delete(`${this.urlProjects}${id}`, { headers: this.headers })
  }

  // getTaskById(project_id:string, task_id:string): Observable<any>{
  //   return this.http.get(`${this.urlProjects}${project_id}`).pipe(map(data => {
  //     return data['projects'].tasks.filter( task =>  (task._id === task_id))[0]
  //   }))
  // }
  // getTasksByProject(project_id:string): Observable<any[]>{
  //   return this.http.get(`${this.urlProjects}${project_id}`).pipe(map(data => {
  //     return data['projects'].tasks.map(task => task)
  //   }))
  // }
  // getUsersByProject(project_id:string): Observable<any[]>{
  //   return this.http.get(`${this.urlProjects}${project_id}`).pipe(map(data => {
  //     return data['projects'].users.map(user => user)
  //   }))
  // }
}
