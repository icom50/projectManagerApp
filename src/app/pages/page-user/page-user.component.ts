import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { User } from 'src/app/models/users.model';
import { ActivatedRoute, Router } from '@angular/router';
import { faBlogger } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavbarService } from 'src/app/services/navbar.service';



@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {
  user: User;
  form: FormGroup;
  faBlogger = faBlogger;
  faGlobe = faGlobe;
  faGithub = faGithubSquare;
  faLinkedin = faLinkedin;

  constructor(private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private nav: NavbarService) { }


    deleteUser(e, id){
      e.preventDefault();
      const confirmation = confirm("Etes vous sur de vouloir surpprimer votre compte ?");
      if(confirmation){
        this._dataService.deleteUser(id).subscribe(res => res);
        this.router.navigate(['/']);
      }else{
        this.router.navigate([`user/${this.user['users']._id}`]);
      }
      console.log("user supprimé")
    }

  // task: any;
  ngOnInit() {
    this.nav.show();
    this.form = new FormGroup({
      username: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      avatar_url: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      phone: new FormControl(),
      company: new FormControl(),
      links: new FormGroup({
        github: new FormControl(),
        linkedin: new FormControl(),
        blog: new FormControl(),
        website: new FormControl(),
      }),
      tasks: new FormControl(),
      _id: new FormControl(),
      job: new FormControl(),
      projects: new FormControl(),
      description: new FormControl(),
    });

    const id = this.route.snapshot.params.id;
    const current_user = localStorage.getItem('current_user').toString()
    // const id = "5db6af162d24d6190d8855f6"


    this
    ._dataService
    .getUserSecure(id)
    .subscribe((data: User) => {
      this.user = data['users'];
      this.form.setValue(this.user) // va remplir tout les champs correspondant
      console.log(id+' --- '+ current_user)      
    })
  }
}
