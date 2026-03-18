import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditTaskDialogComponent } from './add-or-edit-task-dialog.component';

describe('AddOrEditTaskDialogComponent', () => {
  let component: AddOrEditTaskDialogComponent;
  let fixture: ComponentFixture<AddOrEditTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditTaskDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
