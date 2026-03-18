import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.css'
})
export class DeleteConfirmationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {    
  }

  CloseDialog() {
    this.dialogRef.close(null);
  }

  DeleteAndClose() {
    this.dialogRef.close(true);
  }
}
