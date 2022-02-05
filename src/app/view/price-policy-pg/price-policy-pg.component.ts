import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddPriceDialogComponent } from 'src/app/view-helpers/add-price-dialog/add-price-dialog.component';
import { EditRoomPriceDialogComponent } from 'src/app/view-helpers/edit-room-price-dialog/edit-room-price-dialog.component';

@Component({
  selector: 'app-price-policy-pg',
  templateUrl: './price-policy-pg.component.html',
  styleUrls: [
    './price-policy-pg.component.css',
    './price-policy-pg-responsive.component.css',
  ],
})
export class PricePolicyPgComponent implements OnInit {
  item: Observable<any>;
  pricesList: any[] = [];
  displayedColumns: string[] = [
    'name',
    'startDate',
    'endDate',
    'price',
    'edit',
    'delete',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog,
    private toast: HotToastService
  ) {}
  hotelName: string;
  hotelId: string;
  roomName: string;
  userId: string;

  ngOnInit(): void {
    this.getParams();
    this.userUid();
    this.getPrices().subscribe((item: any) => {
      this.pricesList = item;
    });
  }
  getParams() {
    this.activatedRoute.params.subscribe((item: any) => {
      this.hotelName = item.name;
      this.hotelId = item.id;
      this.roomName = item.roomName;
    });
  }
  openDialog() {
    var dialogRef = this.dialog.open(AddPriceDialogComponent, {
      height: 'auto',
      data: {
        id: this.hotelId,
        name: this.hotelName,
        roomName: this.roomName,
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
  getPrices() {
    this.item = this.auth.afs
      .collection('users')
      .doc(this.hotelId)
      .collection('hotels')
      .doc(this.hotelName)
      .collection('rooms')
      .doc(this.roomName)
      .collection('Prices')
      .valueChanges();

    return this.item;
  }
  openEditDialog(
    name: string,
    startDate: number,
    endDate: number,
    price: number
  ) {
    var dialogRef = this.dialog.open(EditRoomPriceDialogComponent, {
      height: 'auto',
      data: {
        id: this.hotelId,
        name: this.hotelName,
        roomName: this.roomName,
        priceName: name,
        startDate: startDate,
        endDate: endDate,
        price: price,
      },
    });
  }
  onDeleteBtnClick(item: string) {
    this.auth.afs
      .collection('users')
      .doc(this.hotelId)
      .collection('hotels')
      .doc(this.hotelName)
      .collection('rooms')
      .doc(this.roomName)
      .collection('Prices')
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
