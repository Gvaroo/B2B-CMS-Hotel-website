import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginFormComponent } from 'src/app/view-helpers/login-form/login-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-responsive-header-dialog',
  templateUrl: './responsive-header-dialog.component.html',
  styleUrls: ['./responsive-header-dialog.component.css'],
})
export class ResponsiveHeaderDialogComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<ResponsiveHeaderDialogComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}
  logOut() {
    this.auth.logOut();
  }
  openDialog() {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      panelClass: 'header-dialog',
      position: { right: '0' },
    });
    this.matDialogRef.close();
  }
  goToHomePg() {
    this.router.navigate(['/']);
    this.dialog.closeAll();
  }
  goToAddHotelPg() {
    this.router.navigate(['/add-hotel']);
    this.dialog.closeAll();
  }
  goToPrivacyPg() {
    this.router.navigate(['/privacy-policy']);
    this.dialog.closeAll();
  }
}
