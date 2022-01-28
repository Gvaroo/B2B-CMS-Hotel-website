import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Discount } from 'src/app/classes/discount';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-discount-registration-dialog',
  templateUrl: './discount-registration-dialog.component.html',
  styleUrls: ['./discount-registration-dialog.component.css'],
})
export class DiscountRegistrationDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DiscountRegistrationDialogComponent>,
    private auth: AuthService
  ) {}
  discountForm: FormGroup;
  discount: Discount = new Discount();
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.discountForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      discountAmount: new FormControl(null, Validators.required),
    });
  }
  onFormSubmit() {
    this.discount = this.discountForm.value;
    this.addDiscount();
    this.dialogRef.close();
  }
  addDiscount() {
    var userRef = this.auth.afs
      .collection('users')
      .doc(this.data.id)
      .collection('hotels')
      .doc(this.data.name)
      .collection('discounts')
      .doc(this.discount.name);

    return userRef.set(this.discount, {
      merge: false,
    });
  }
}
