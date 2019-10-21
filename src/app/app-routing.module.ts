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


const routes: Routes = [
  {
    path : "",
    component : PageLandingComponent
  },
  {
    path : "home",
    component : PageHomeComponent
  },
  {
    path : "log",
    component : PageLogComponent
  },
  {
    path : "project/:id",
    component : PageProjectComponent
  },
  {
    path : "projects/:id",
    component : PageProjectsComponent
  },
  {
    path : "user/:id",
    component : PageUserComponent
  },
  {
    path : "task-list/:id",
    component : PageTaskListComponent
  },
  {
    path : "project-management/:id",
    component : PageProjectManagementComponent
  },
  {
    path : "**",
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
