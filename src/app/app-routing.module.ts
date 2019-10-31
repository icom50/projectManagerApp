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
import { FormCreateProjectComponent } from './pages/forms/form-create-project/form-create-project.component';
import { FormCreateTaskComponent } from './pages/forms/form-create-task/form-create-task.component';
import { PageUserEditComponent } from './pages/page-user-edit/page-user-edit.component';
import { PasswordForgottenComponent } from './pages/forms/password-forgotten/password-forgotten.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { FormEditProjectComponent } from './pages/forms/form-edit-project/form-edit-project.component';
import { FormEditTaskComponent } from './pages/forms/form-edit-task/form-edit-task.component';

const routes: Routes = [
  { path : "", component : PageLandingComponent },
  { path : "home", component : PageHomeComponent },
  { path : "log", component : PageLogComponent },
  //besoin d'un /project pour arriver sur la page 'board' avec tout les projets
  { path : "project/:id", component : PageProjectComponent }, // page avec tout les tasks en tiles
  { path : "projects/:id", component : PageProjectsComponent },
  { path : "user/:id", component : PageUserComponent },
  { path : "user-edit/:id", component : PageUserEditComponent },
  { path : "task-list/:id", component : PageTaskListComponent },
  { path : "project-management/:id", component : PageProjectManagementComponent },
  { path : "project/details/:id", component : ProjectDetailsComponent},
  { path : "project/details/:id/edit", component : FormEditProjectComponent },
  { path : "test2", component : FormCreateProjectComponent},
  { path : "testgwen", component : FormCreateTaskComponent},
  { path : "reset-password", component : PasswordForgottenComponent },
  { path : "sign-up", component : FormSignUpComponent },
  { path : "project/:id/edit", component : FormEditProjectComponent },
  { path : "**", component : PageNotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
