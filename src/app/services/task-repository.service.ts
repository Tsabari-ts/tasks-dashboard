import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskItem } from '../models/task-item';
import { Observable } from 'rxjs';
import { OperationResult } from '../models/operation-result';

@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryService {

  constructor(private http:HttpClient) { }

  getAllTasks() {
    return this.http.get<TaskItem[]>(`http://localhost:7176/Tasks/GetAllTasks`);
  }

  createTask(taskData: TaskItem): Observable<OperationResult> {
    return this.http.post<any>(`http://localhost:7176/Tasks/CreateTask/`, taskData);
  }

  updateTask(taskId: number, taskData: TaskItem): Observable<OperationResult> {
    return this.http.put<any>(`http://localhost:7176/Tasks/UpdateTask/${taskId}`, taskData);
  }

  deleteTaskById(taskId:number): Observable<OperationResult> {
    return this.http.delete<any>(`http://localhost:7176/Tasks/DeleteTask/${taskId}`);
  }
}
