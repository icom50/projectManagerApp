import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Project } from 'src/app/models/projects.model';
import { DataService } from 'src/app/services/data.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  current_user:string;

  comment:String;
  @Input() project;

  constructor(private _dataService : DataService) { }

  addComment(comment){
    //console.log(comment);
    this.project.comments.push({comment: comment.value, author_id: this.current_user});
    //console.log(this.project.comments)
    //console.log(this.project);
    this._dataService.putProject(this.project).subscribe();
    comment.value = "";
  }

  deleteComment(index){
    // console.log(this.project.comments);
    this.project.comments.splice(index,1);
    console.log(this.project.comments);
    this._dataService.putProject(this.project).subscribe();

    
  
  }

  ngOnInit() {
    this.current_user = localStorage.getItem('current_user');
    // console.log(current_user);
  }

}
