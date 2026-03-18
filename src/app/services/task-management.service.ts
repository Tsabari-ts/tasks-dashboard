import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskItem } from '../models/task-item';
import { TaskRepositoryService } from './task-repository.service';
import { OperationResult } from '../models/operation-result';


@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {

  constructor(private repository: TaskRepositoryService) { }

  getAllTasks(): Observable<TaskItem[]> {    
    return this.repository.getAllTasks();
  }

  createTask(taskData: TaskItem): Observable<OperationResult> {
    return this.repository.createTask(taskData);
  }

  updateTask(taskId: number, taskData: TaskItem): Observable<OperationResult> {
    return this.repository.updateTask(taskId, taskData);
  }

  deleteTaskById(taskId:number): Observable<OperationResult>{
    return this.repository.deleteTaskById(taskId);
  }
}
