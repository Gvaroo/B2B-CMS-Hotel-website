import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-booking-pg',
  templateUrl: './booking-pg.component.html',
  styleUrls: ['./booking-pg.component.css'],
})
export class BookingPgComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'startDate',
    'endDate',
    'price',
    'book',
  ];
  item: Observable<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private toast: HotToastService
  ) {}
  hotelName: string;
  hotelId: string;
  roomName: string;
  pricesList: any[] = [];

  bookingObject: any = {
    booked: true,
  };

  ngOnInit(): void {
    this.getParams();
    this.getPrices().subscribe((item: any) => {
      this.pricesList = item;
    });
  }
  getParams() {
    this.activatedRoute.params.subscribe((item: any) => {
      this.hotelName = item.name;
      this.hotelId = item.id;
      this.roomName = item.roomName;
      console.log(this.hotelId, this.hotelName, this.roomName);
    });
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
  //es booking funqcia aris ubralod testistvis ro shemowmdes ro mushaobs.
  onBookBtnClick(item: any) {
    var userRef = this.auth.afs
      .collection('users')
      .doc(this.hotelId)
      .collection('hotels')
      .doc(this.hotelName)
      .collection('rooms')
      .doc(this.roomName)
      .collection('Prices')
      .doc(item);

    return userRef
      .set(this.bookingObject, {
        merge: true,
      })
      .then(() => {
        this.toast.success('Room was booked!');
      })
      .catch((error) => {
        this.toast.error(error);
      });
  }
}
