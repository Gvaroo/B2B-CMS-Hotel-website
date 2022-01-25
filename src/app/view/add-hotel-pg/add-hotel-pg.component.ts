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
  image: string;
  urls = new Array<string>();

  onImagesInpChange(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  ngOnInit(): void {
    this.userUid();
  }
  onFormSubmit(form: NgForm) {
    if (form.valid) {
      this.hotel = form.value;
      this.hotel.images = this.urls;
      this.hotel.uid = this.uid;
      this.getDate();
      this.addHotel();
      this.toast.success('Your hotel was added!');
      this.router.navigate(['/']);
    }
  }
  userUid() {
    this.auth.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
        console.log(this.uid);
      }
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
