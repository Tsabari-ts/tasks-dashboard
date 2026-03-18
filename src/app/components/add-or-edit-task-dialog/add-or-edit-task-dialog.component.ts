import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskItem } from '../../models/task-item';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PRIORITIES, STATUSES } from '../../models/lookup'

@Component({
  selector: 'add-or--edit-task-dialog',
  standalone: true,
 imports: [CommonModule, FormsModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-or-edit-task-dialog.component.html',
  styleUrl: './add-or-edit-task-dialog.component.css'
})
export class AddOrEditTaskDialogComponent implements OnInit {
  form!: FormGroup;
  priorities = PRIORITIES;
  statuses = STATUSES;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public task: TaskItem,
    private dialogRef: MatDialogRef<AddOrEditTaskDialogComponent>
  ) {}

    ngOnInit() {
    this.form = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      taskDescription: [this.task?.taskDescription || ''],
      priorityId: [this.task?.priorityId || Validators.required],
      dueDate: [this.task?.dueDate || '', Validators.required],
      statusId: [this.task?.statusId || Validators.required]
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newTask = this.form.value;
    this.dialogRef.close(newTask);  
    this.form.reset();
  }

  cancel() {
    this.dialogRef.close(null);
  }
}