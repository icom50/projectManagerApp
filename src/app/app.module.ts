import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


/* Components */
import { CommonNavbarComponent } from './pages/commons/common-navbar/common-navbar.component';
import { FormCreateProjectComponent } from './pages/forms/form-create-project/form-create-project.component';
import { FormCreateTaskComponent } from './pages/forms/form-create-task/form-create-task.component';
import { FormEditProjectComponent } from './pages/forms/form-edit-project/form-edit-project.component';
import { FormEditTaskComponent } from './pages/forms/form-edit-task/form-edit-task.component';
import { FormLoginComponent } from './pages/forms/form-login/form-login.component';
import { FormSignUpComponent } from './pages/forms/form-sign-up/form-sign-up.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLandingComponent } from './pages/page-landing/page-landing.component';
import { PageLogComponent } from './pages/page-logs/page-log.component';
import { PageProjectComponent } from './pages/page-project/page-project.component';
import { PageProjectsComponent } from './pages/page-projects/page-projects.component';
import { PageUserComponent } from './pages/page-user/page-user.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageTaskListComponent } from './pages/page-task-list/page-task-list.component';
import { PageProjectManagementComponent } from './pages/page-project-management/page-project-management.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/* Material Modules */
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    CommonNavbarComponent,
    FormCreateProjectComponent,
    FormCreateTaskComponent,
    FormEditProjectComponent,
    FormEditTaskComponent,
    FormLoginComponent,
    FormSignUpComponent,
    PageHomeComponent,
    PageProjectComponent,
    PageProjectsComponent,
    PageLandingComponent,
    PageLogComponent,
    PageUserComponent,
    PageNotFoundComponent,
    PageTaskListComponent,
    PageProjectManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatInputModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
