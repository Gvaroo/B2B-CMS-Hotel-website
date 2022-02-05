import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Discount } from 'src/app/classes/discount';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DiscountRegistrationDialogComponent } from 'src/app/view-helpers/discount-registration-dialog/discount-registration-dialog.component';

@Component({
  selector: 'app-discount-pg',
  templateUrl: './discount-pg.component.html',
  styleUrls: [
    './discount-pg.component.css',
    './discount-pg-responsive.component.css',
  ],
})
export class DiscountPgComponent implements OnInit {
  item: Observable<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private auth: AuthService,
    private toast: HotToastService
  ) {}
  hotelId: any;
  userId: any;
  hotelName: any;
  discounts: any[] = [];

  ngOnInit(): void {
    this.getParams();
    this.userUid();
    this.getHotelDiscount().subscribe((item: any) => {
      this.discounts = item;
    });
  }

  getParams() {
    this.activatedRoute.params.subscribe((item: any) => {
      this.hotelId = item.id;
      this.hotelName = item.name;
    });
  }
  openDialog() {
    var dialogRef = this.dialog.open(DiscountRegistrationDialogComponent, {
      height: 'auto',
      data: {
        id: this.hotelId,
        name: this.hotelName,
      },
    });
  }
  userUid() {
    this.auth.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  checkConditions() {
    if (this.userId == this.hotelId) {
      return true;
    } else {
      return false;
    }
  }
  getHotelDiscount() {
    this.item = this.auth.afs
      .collection('users')
      .doc(this.hotelId)
      .collection('hotels')
      .doc(this.hotelName)
      .collection('discounts')
      .valueChanges();

    return this.item;
  }
  deleteDiscountBtn(item: any) {
    this.auth.afs
      .collection('users')
      .doc(this.hotelId)
      .collection('hotels')
      .doc(this.hotelName)
      .collection('discounts')
      .doc(item)
      .delete()
      .then(() => {
        this.toast.success('Your discount was deleted!');
      })
      .catch((error) => {
        this.toast.error(error);
      });
  }
}
