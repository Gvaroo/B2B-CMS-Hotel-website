import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Hotel } from 'src/app/classes/hotel';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-hotel-pg',
  templateUrl: './add-hotel-pg.component.html',
  styleUrls: ['./add-hotel-pg.component.css'],
})
export class AddHotelPgComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private toast: HotToastService,
    private router: Router
  ) {}
  hotel: Hotel = new Hotel();
  uid: any;
  dateTime: any;
  onImgInpChange(event: Event) {
    var self = this;
    var reader = new FileReader();
    reader.readAsDataURL((event?.target as any)?.files[0]);
    reader.onload = function () {
      var basetext = reader.result != undefined ? reader.result.toString() : '';
      self.hotel.image = basetext;
    };
    reader.onerror = function () {
      console.log('error');
    };
  }
  ngOnInit(): void {
    this.userUid();
  }
  onFormSubmit(form: NgForm) {
    if (form.valid && this.hotel.image != null) {
      this.hotel = form.value;
      this.getDate();
      this.addHotel();
      this.toast.success('Your hotel was added!');
      this.router.navigate(['/']);
    }
  }
  userUid() {
    var user = this.auth.afAuth.currentUser;
    user.then((currentUser) => {
      this.uid = currentUser.uid;
      console.log(currentUser.uid);
    });
  }
  addHotel() {
    var userRef = this.auth.afs
      .collection('users')
      .doc(`${this.uid}`)
      .collection('hotels')
      .doc(`${this.hotel.name}`);

    return userRef.set(this.hotel, {
      merge: false,
    });
  }
  getDate() {
    var currentdate = new Date();
    this.dateTime =
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear();
    this.hotel.date = this.dateTime;
  }
}