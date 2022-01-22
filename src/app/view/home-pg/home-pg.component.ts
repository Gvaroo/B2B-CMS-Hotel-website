import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-home-pg',
  templateUrl: './home-pg.component.html',
  styleUrls: ['./home-pg.component.css'],
})
export class HomePgComponent implements OnInit {
  items: Observable<any>;
  hotels: [] = [];
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.getHotels().subscribe((items: any) => {
      this.hotels = items;
    });
  }
  getHotels() {
    this.items = this.auth.afs.collectionGroup('hotels').valueChanges();
    return this.items;
  }
}
