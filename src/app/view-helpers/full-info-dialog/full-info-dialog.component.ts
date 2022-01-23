import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/classes/hotel';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-full-info-dialog',
  templateUrl: './full-info-dialog.component.html',
  styleUrls: ['./full-info-dialog.component.css'],
})
export class FullInfoDialogComponent implements OnInit {
  items: Observable<any>;
  hotel: Hotel;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<FullInfoDialogComponent>,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getHotel().subscribe((response: any) => {
      this.hotel = response;
    });
  }

  getHotel() {
    this.items = this.auth.afs
      .collection('users')
      .doc(this.data.id)
      .collection('hotels')
      .doc(this.data.name)
      .valueChanges();
    return this.items;
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
