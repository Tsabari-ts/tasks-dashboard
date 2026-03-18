import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddOrEditTaskDialogComponent } from '../components/add-or-edit-task-dialog/add-or-edit-task-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private isDialogOpen = false;

  constructor(private dialog: MatDialog) { }

  openAddOrEditTaskDialog(data?: any): MatDialogRef<AddOrEditTaskDialogComponent> | null {
    if (this.isDialogOpen) return null;
    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(AddOrEditTaskDialogComponent, {
      width: '600px',
      disableClose: true,
      data: data ? { ...data } : null
    });

    dialogRef.afterClosed().subscribe(() => this.isDialogOpen = false);
    return dialogRef;
  }

  openDeleteConfirmationDialog(dialogData?: any): MatDialogRef<DeleteConfirmationDialogComponent> | null {
    if (this.isDialogOpen) return null;
    this.isDialogOpen = true;

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => this.isDialogOpen = false);
    return dialogRef;
  }
}