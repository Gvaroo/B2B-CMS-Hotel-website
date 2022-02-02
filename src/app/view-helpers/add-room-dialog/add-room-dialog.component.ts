import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from 'src/app/classes/room';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.css'],
})
export class AddRoomDialogComponent implements OnInit {
  item: Observable<any>;
  room: Room;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddRoomDialogComponent>,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRoom().subscribe((response: any) => {
      this.room = response;
    });
  }

  getRoom() {
    this.item = this.auth.afs
      .collection('users')
      .doc(this.data.id)
      .collection('hotels')
      .doc(this.data.hotelName)
      .collection('rooms')
      .doc(this.data.name)
      .valueChanges();
    return this.item;
  }
  goToDiscountPg() {
    this.router.navigate(['/discounts/', this.data.hotelName, this.data.id]);
    this.dialogRef.close();
  }
  goToPricePolicyPg(item: any) {
    this.router.navigate([
      '/price-policy/',
      this.data.hotelName,
      this.data.id,
      item,
    ]);
    this.dialogRef.close();
  }
  goToBookingPg(item: any) {
    this.router.navigate([
      '/booking/',
      this.data.hotelName,
      this.data.id,
      item,
    ]);
    this.dialogRef.close();
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
