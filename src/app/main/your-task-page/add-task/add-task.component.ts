import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  newTaskForm: FormGroup;
  users: any[] = [];
  projects: any[] = [];

  ngOnInit(): void {
    this.ApiService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.ApiService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
  constructor(
    private fb: FormBuilder,
    private ApiService: ApiService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
  ) {
    this.newTaskForm = this.fb.group({
      project: ['', Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
      status: ['new', Validators.required],
      owner: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.newTaskForm.valid) {
      let formattedTaskData = { ...this.newTaskForm.value };

      // Ensure due_date is defined and not empty
      if (this.newTaskForm.value.due_date) {
        formattedTaskData.due_date = formatDate(this.newTaskForm.value.due_date, 'yyyy-MM-dd', 'en');
      }
      this.dialogRef.close(formattedTaskData);
    }
  }

}
