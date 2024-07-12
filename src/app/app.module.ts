import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
