import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-room-image-dialog',
  templateUrl: './room-image-dialog.component.html',
  styleUrls: ['./room-image-dialog.component.css'],
})
export class RoomImageDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private matDialogRef: MatDialogRef<RoomImageDialogComponent>
  ) {}
  image: string = this.data.image;

  ngOnInit(): void {}
  closeDialog() {
    this.matDialogRef.close();
  }
}
