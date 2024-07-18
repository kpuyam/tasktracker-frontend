import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './homepage/dashboard/dashboard.component';
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
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    RouterModule.forChild(routes),
    MatMenuModule,
  ],
  exports:[
    RouterModule
  ],
  providers:[
    ApiService, AuthGuard,AuthService
  ]
})
export class MainModule { }
