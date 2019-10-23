import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLandingComponent } from './pages/page-landing/page-landing.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLogComponent } from './pages/page-logs/page-log.component';
import { PageProjectComponent } from './pages/page-project/page-project.component';
import { PageProjectsComponent } from './pages/page-projects/page-projects.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { PageTaskListComponent } from './pages/page-task-list/page-task-list.component';
import { PageProjectManagementComponent } from './pages/page-project-management/page-project-management.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { FormSignUpComponent } from './pages/forms/form-sign-up/form-sign-up.component';
import { FormLoginComponent } from './pages/forms/form-login/form-login.component';

const routes: Routes = [
  { path : "", component : PageLandingComponent },
  { path : "home", component : PageHomeComponent },
  { path : "log", component : PageLogComponent },
  //besoin d'un /project pour arriver sur la page 'board' avec tout les projets
  { path : "project/:id", component : PageProjectComponent }, // page avec tout les tasks en tiles
  { path : "projects/:id", component : PageProjectsComponent },
  { path : "user/:id", component : PageUserComponent },
  { path : "task-list/:id", component : PageTaskListComponent },
  { path : "project-management/:id", component : PageProjectManagementComponent },
  
  { path : "sign-up", component : FormSignUpComponent },

  { path : "**", component : PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
