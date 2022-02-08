import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddRoomDialogComponent } from 'src/app/view-helpers/add-room-dialog/add-room-dialog.component';
import { ImageGalleryDialogComponent } from 'src/app/view-helpers/image-gallery-dialog/image-gallery-dialog.component';
import { AddRoomPgComponent } from './add-room-pg/add-room-pg.component';

@Component({
  selector: 'app-show-rooms-pg',
  templateUrl: './show-rooms-pg.component.html',
  styleUrls: [
    './show-rooms-pg.component.css',
    './show-rooms-responsive-component.css',
  ],
})
export class ShowRoomsPgComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}
  item: Observable<any>;
  item2: Observable<any>;
  userId: string;
  hotelId: string;
  hotelName: string;
  hotel: any;
  rooms: any[] = [];
  ngOnInit(): void {
    this.userUid();
    this.getParams();
    this.getHotel().subscribe((item: any) => {
      this.hotel = item;
    });
    this.getRooms().subscribe((item: any) => {
      this.rooms = item;
      console.log(this.rooms);
    });
  }
  getParams() {
    this.activatedRouter.params.subscribe((response: any) => {
      this.hotelName = response.name;
      this.hotelId = response.id;
    });
  }
  getHotel() {
    this.item = this.auth.afs
      .collection('users')
      .doc(this.hotelId)
      .collection('hotels')
      .doc(this.hotelName)
      .valueChanges();
    return this.item;
  }
  userUid() {
    this.auth.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }
  checkCondition() {
    if (this.userId == this.hotelId) {
      return true;
    } else {
      return false;
    }
  }
  getRooms() {
    this.item2 = this.auth.afs
      .collection('users')
      .doc(this.hotelId)
      .collection('hotels')
      .doc(this.hotelName)
      .collection('rooms')
      .valueChanges();

    return this.item2;
  }
  openDialog(item: any) {
    const dialogRef = this.dialog.open(AddRoomDialogComponent, {
      height: 'auto',
      data: {
        name: item,
        id: this.hotelId,
        hotelName: this.hotelName,
      },
      panelClass: 'addRoomDailogResponsive',
    });
  }
  openImageGalleryDialog(item: string) {
    const dialogRef = this.dialog.open(ImageGalleryDialogComponent, {
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      data: {
        defaultImage: item,
        id: this.hotelId,
        hotelName: this.hotelName,
      },
      panelClass: 'roomGalleryDailog',
    });
  }
}
