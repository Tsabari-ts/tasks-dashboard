import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../../models/task-item';
import { BehaviorSubject, catchError, of, switchMap, take, tap } from 'rxjs';
import { TaskManagementService } from '../../services/task-management.service';
import { CommonModule } from '@angular/common';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { PRIORITIES, STATUSES } from '../../models/lookup'
import { OperationResult } from '../../models/operation-result';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private tasksSubject = new BehaviorSubject<TaskItem[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(
    private taskManagement: TaskManagementService,    
    private dialogService: DialogService) { }

ngOnInit(): void {  
  this.taskManagement.getAllTasks().pipe(
    take(1),
    tap(tasks => this.tasksSubject.next(tasks))
  ).subscribe(); 
}

  onAddTask() {
  const dialogRef = this.dialogService.openAddOrEditTaskDialog();
  if (!dialogRef) return;

    dialogRef.afterClosed().pipe(
      take(1),
      switchMap(result => {
        if (result) {
          return this.taskManagement.createTask(result).pipe(
            tap((res: OperationResult) => {
              if (res.success && res.taskItemData) {
                this.tasksSubject.next([...this.tasksSubject.value, res.taskItemData]);
              } else {
                console.error(res.message);
              }
            }),
            catchError(err => {
              console.error(err);
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe();
  }

  onEditTask(task: TaskItem) {
    const dialogRef = this.dialogService.openAddOrEditTaskDialog(task);
    if (!dialogRef) return;

    dialogRef.afterClosed().pipe(
      take(1),
      switchMap(result => {
        if (result) {
          return this.taskManagement.updateTask(task.id, result).pipe(
            tap((res: OperationResult) => {
              if (res.success && res.taskItemData) {
                const updatedTasks = this.tasksSubject.value.map(t =>
                  t.id === res.taskItemData!.id ? res.taskItemData! : t
                );
                this.tasksSubject.next(updatedTasks);
              } else {
                console.error(res.message);
              }
            }),
            catchError(err => {
              console.error(err);
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe();
  }

  onDeleteTask(taskId: number) {
    const dialogRef = this.dialogService.openDeleteConfirmationDialog();
    if (!dialogRef) return;

    dialogRef.afterClosed().pipe(
      take(1),
      switchMap(result => {
        if (result) {
          return this.taskManagement.deleteTaskById(taskId).pipe(
            tap((res: OperationResult) => {
              if (res.success) {          
                const updatedTasks = this.tasksSubject.value.filter(t => t.id !== taskId);
                this.tasksSubject.next(updatedTasks);
              } else {
                console.error(res.message);
              }
            }),
            catchError(err => {
              console.error(err);
              return of(null);
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe();
  }

  getPriorityName(id: number) {
    const item = PRIORITIES.find(p => p.id === id);
    return item ? item.name : '';
  }

  getStatusName(id: number) {
    const item = STATUSES.find(s => s.id === id);
    return item ? item.name : '';
  }
}
