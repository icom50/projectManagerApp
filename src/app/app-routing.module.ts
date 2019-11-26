import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLandingComponent } from './pages/page-landing/page-landing.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLogComponent } from './pages/page-logs/page-log.component';
import { PageProjectComponent } from './pages/page-project/page-project.component';
import { PageProjectsComponent } from './pages/page-projects/page-projects.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { PageTaskListComponent } from './pages/page-task-list/page-task-list.component';
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
import { AuthGuardsService } from './services/auth-guards.service';
import { SendInformationComponent } from './pages/forms/send-information/send-information.component';

const routes: Routes = [
  { path : '', component : PageLandingComponent },
  { path : 'sign-up', component : FormSignUpComponent },
  { path : 'reset-password', component : PasswordForgottenComponent },
  { path : 'reset-password/:email', component : SendInformationComponent },
  { path : 'home', component : PageHomeComponent, canActivate : [AuthGuardsService] },
  { path : 'log', component : PageLogComponent, canActivate : [AuthGuardsService] },
  //besoin d'un /project pour arriver sur la page 'board' avec tout les projets
  { path : 'project/:id', component : PageProjectComponent, canActivate : [AuthGuardsService] }, // page avec tout les tasks en tiles
  { path : 'projects', component : PageProjectsComponent, canActivate : [AuthGuardsService] },
  { path : 'user/:id', component : PageUserComponent, canActivate : [AuthGuardsService] },
  { path : 'user-edit/:id', component : PageUserEditComponent, canActivate : [AuthGuardsService] },
  { path : 'task-list/:id', component : PageTaskListComponent, canActivate : [AuthGuardsService] },
  { path : 'project/details/:id', component : ProjectDetailsComponent, canActivate : [AuthGuardsService]},
  { path : 'project/details/:id/edit', component : FormEditProjectComponent, canActivate : [AuthGuardsService]  },
  { path : 'create', component : FormCreateProjectComponent, canActivate : [AuthGuardsService]},
  { path : 'task/:id', component : FormEditTaskComponent, canActivate : [AuthGuardsService]},
  { path : 'task', component : FormCreateTaskComponent, canActivate : [AuthGuardsService]},
  
  { path: 'not-found', component: PageNotFoundComponent },
  { path : '**', redirectTo : 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
