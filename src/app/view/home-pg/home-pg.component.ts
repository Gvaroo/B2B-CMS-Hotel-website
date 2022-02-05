import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FullInfoDialogComponent } from 'src/app/view-helpers/full-info-dialog/full-info-dialog.component';

@Component({
  selector: 'app-home-pg',
  templateUrl: './home-pg.component.html',
  styleUrls: ['./home-pg.component.css', './home-pg-responsive.component.css'],
})
export class HomePgComponent implements OnInit {
  items: Observable<any>;

  hotels: any[] = [];
  adminId: string = 'cM3qwi1JGkR2hBwuO0TKKHXCtJj1';
  uid: any;
  constructor(private auth: AuthService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getHotels().subscribe((items: any) => {
      this.hotels = items;
    });
    this.userInformation();
  }

  getHotels() {
    this.items = this.auth.afs.collectionGroup('hotels').valueChanges();
    return this.items;
  }

  userInformation() {
    this.auth.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
      } else {
        console.log('not logged in');
      }
    });
  }
  openDialog(name: string, uid: any) {
    const dialogRef = this.dialog.open(FullInfoDialogComponent, {
      height: '100%',
      data: {
        name: name,
        id: uid,
      },
      panelClass: 'fullInformationDialog',
    });
  }
  checkCondition(item: any) {
    if (
      (this.uid != undefined && item === this.uid) ||
      this.uid === this.adminId
    ) {
      return true;
    } else {
      return false;
    }
  }
}
