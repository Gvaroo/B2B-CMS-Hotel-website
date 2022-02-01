import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { RoomPrice } from 'src/app/classes/roomPrice';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-edit-room-price-dialog',
  templateUrl: './edit-room-price-dialog.component.html',
  styleUrls: ['./edit-room-price-dialog.component.css'],
})
export class EditRoomPriceDialogComponent implements OnInit {
  editForm: FormGroup;
  editedPrice: RoomPrice = new RoomPrice();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
    private dialogRef: MatDialogRef<EditRoomPriceDialogComponent>,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.editForm = new FormGroup({
      name: new FormControl(this.data.priceName, Validators.required),
      startDate: new FormControl(this.data.startDate, Validators.required),
      endDate: new FormControl(this.data.endDate, Validators.required),
      roomPrice: new FormControl(this.data.price, Validators.required),
    });
  }
  onFormSubmit() {
    this.editedPrice = this.editForm.value;
    this.updateData();
    this.toast.success('Edit was successful');
    this.dialogRef.close();
  }
  updateData() {
    var userRef = this.auth.afs
      .collection('users')
      .doc(this.data.id)
      .collection('hotels')
      .doc(this.data.name)
      .collection('rooms')
      .doc(this.data.roomName)
      .collection('Prices')
      .doc(this.data.priceName);

    return userRef.set(this.editedPrice, {
      merge: true,
    });
  }
}
