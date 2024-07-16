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
import { ProjectsComponent } from './projects-section/projects/projects.component';
import { ProjectDetailComponent } from './projects-section/project-detail/project-detail.component';

const routes: Routes = [
  {path: 'main', component: MainComponent}
];
@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    TeammatesComponent,
    TasksHomeComponent,
    TasksComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectDetailComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
  providers:[
    ApiService
  ]
})
export class MainModule { }
