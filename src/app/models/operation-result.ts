import { TaskItem } from "./task-item";

export class OperationResult<T = any> {
  constructor(
    public success: boolean,
    public message: string = '',
    public taskItemData?: TaskItem
  ) {}
}