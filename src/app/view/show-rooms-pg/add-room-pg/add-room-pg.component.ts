import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Room } from 'src/app/classes/room';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-room-pg',
  templateUrl: './add-room-pg.component.html',
  styleUrls: [
    './add-room-pg.component.css',
    './add-room-pg-responsive.component.css',
  ],
})
export class AddRoomPgComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private toast: HotToastService,
    private router: Router
  ) {}
  userId: string;
  hotelName: string;
  image: any;
  room: Room = new Room();
  ngOnInit(): void {
    this.getParams();
  }
  getParams() {
    this.activatedRoute.params.subscribe((response: any) => {
      this.userId = response.id;
      this.hotelName = response.name;
    });
  }
  onFormSubmit(form: NgForm) {
    this.room = form.value;
    console.log(this.image);
    this.room.image = this.image;
    this.addRoom();
    this.toast.success('Your room was added!');
    this.router.navigate([`/show-rooms/${this.hotelName}/${this.userId}`]);
  }

  addRoom() {
    var userRef = this.auth.afs
      .collection('users')
      .doc(this.userId)
      .collection('hotels')
      .doc(this.hotelName)
      .collection('rooms')
      .doc(this.room.name);

    return userRef.set(this.room, {
      merge: false,
    });
  }
  onImgInpChange(event: Event) {
    var self = this;
    var reader = new FileReader();
    reader.readAsDataURL((event?.target as any)?.files[0]);
    reader.onload = function () {
      var basetext = reader.result != undefined ? reader.result.toString() : '';
      self.image = basetext;
    };
    reader.onerror = function () {
      console.log('error');
    };
  }
}
