import { NgModule } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { TeammatesComponent } from './homepage/teammates/teammates.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../api.service';
import { NavbarComponent } from './Headers/navbar/navbar.component';
import { TasksHomeComponent } from './homepage/tasks-home/tasks-home.component';
import { TasksComponent } from './projects-section/tasks/tasks.component';
import { ProjectDetailComponent } from './projects-section/project-detail/project-detail.component';
import { ProjectsComponent } from './projects-section/projects/projects.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './homepage/dashboard/dashboard.component'; 
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProjectComponent } from './projects-section/new-project/new-project.component';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


const routes: Routes = [
    {
      path: '',
      component: MainComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', component: HomepageComponent }, 
        { path: 'projects', component: ProjectsComponent },
        { path: 'projects/:id', component: ProjectDetailComponent },
        { path: 'projects/:id/tasks', component: TasksComponent },
        { path: 'new-project', component: NewProjectComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
      ]
    }
  ];
@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    TeammatesComponent,
    TasksComponent,
    TasksComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    TasksHomeComponent,
    HomepageComponent,
    NewProjectComponent,
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    CarouselModule.forRoot(),
    MatOption,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
  providers:[
    ApiService, AuthGuard,AuthService
  ]
})
export class MainModule { }
