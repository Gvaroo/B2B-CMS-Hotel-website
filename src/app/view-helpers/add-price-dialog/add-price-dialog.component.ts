import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { RoomPrice } from 'src/app/classes/roomPrice';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-price-dialog',
  templateUrl: './add-price-dialog.component.html',
  styleUrls: ['./add-price-dialog.component.css'],
})
export class AddPriceDialogComponent implements OnInit {
  priceForm: FormGroup;
  roomPrice: RoomPrice = new RoomPrice();
  booked: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService,
    private dialogRef: MatDialogRef<AddPriceDialogComponent>,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.priceForm = new FormGroup({
      date: new FormControl(null, Validators.required),
      roomPrice: new FormControl(null, Validators.required),
    });
  }
  onFormSubmit() {
    this.roomPrice = this.priceForm.value;
    this.roomPrice.booked = this.booked;
    this.addPrice();
    this.toast.success('Your price was added!');
    this.dialogRef.close();
  }
  addPrice() {
    var userRef = this.auth.afs
      .collection('users')
      .doc(this.data.id)
      .collection('hotels')
      .doc(this.data.name)
      .collection('rooms')
      .doc(this.data.roomName)
      .collection('Prices')
      .doc(this.roomPrice.date);

    return userRef.set(this.roomPrice, {
      merge: false,
    });
  }
}
