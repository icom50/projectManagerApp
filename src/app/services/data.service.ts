import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/projects.model';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}
  // change API's url HERE
  url:string = 'http://localhost:8001/';
  urlUsers:string = `${this.url}api/users/`;
  urlUser:string = `${this.url}api/user/`;
  urlProjects:string = `${this.url}api/projects/`;

  // /api/users
  getUsers():Observable<User[]>{
    return this.http.get(this.urlUsers).pipe(map (data => data as User[]))
  }
  getUserById(id:string): Observable<User>{
    return this.http.get(`${this.urlUsers}${id}`).pipe(map(data => data as User))
  }
  getUserByEmail(email:string): Observable<User>{
    return this.http.get(`${this.urlUsers}email/${email}`).pipe(map(data => data as User))
  }

  // /api/user
  getUserSecure(id:string): Observable<User>{
    return this.http.get(`${this.urlUser}${id}`).pipe(map(data => data as User))
  }
  postUser(user:User): Observable<User>{
    const headers = new HttpHeaders().set('content-type','application/json');
    return this.http.post(`${this.urlUser}`,user,{headers});
  }
  putUser(user:User): Observable<User>{
    const headers = new HttpHeaders().set('content-type','application/json');
    return this.http.put(`${this.urlUser}${user._id}`,user,{headers})
  }
  deleteUser(id:string): Observable<User>{
    const headers = new HttpHeaders().set('content-type','application/json');
    return this.http.delete(`${this.urlUser}${id}`,{headers})
  }
  //devrait renvoyer un Token, mais inutile pour le moment
  loginUser(user:User): Observable<User>{
    const headers = new HttpHeaders().set('content-type','application/json');
    return this.http.post(`${this.urlUser}login`,user,{headers});
  }

  // /api/projects
  getProjects():Observable<Project[]>{
    return this.http.get(this.urlProjects).pipe(map (data => data as Project[]))
  }
  getProjectById(id:string): Observable<Project>{
    return this.http.get(`${this.urlProjects}${id}`).pipe(map(data => data as Project))
  }
  postProject(project:Project): Observable<Project>{
    const headers = new HttpHeaders().set('content-type','application/json');
    return this.http.post(`${this.urlProjects}`,project,{headers});
  }
  putProject(project:Project): Observable<Project>{
    const headers = new HttpHeaders().set('content-type','application/json');
    return this.http.put(`${this.urlProjects}${project._id}`,project,{headers})
  }
  deleteProject(id:string): Observable<Project>{
    const headers = new HttpHeaders().set('content-type','application/json');
    return this.http.delete(`${this.urlProjects}${id}`,{headers})
  }
}
