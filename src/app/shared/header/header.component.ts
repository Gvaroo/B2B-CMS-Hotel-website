import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginFormComponent } from 'src/app/view-helpers/login-form/login-form.component';
import { AuthService } from '../services/auth.service';
import { ResponsiveHeaderDialogComponent } from './responsive-header-dialog/responsive-header-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
    private router: Router
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      panelClass: 'header-dialog',
      position: { right: '0' },
      backdropClass: 'loginDropBackGround',
    });
  }
  ngOnInit(): void {}
  openResponsiveDialog() {
    var dialogRef = this.dialog.open(ResponsiveHeaderDialogComponent, {
      position: { top: '0' },
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
      panelClass: 'header-responsive-dialog',
      backdropClass: 'backdropBackground',
    });
  }
  goToMainPg() {
    this.router.navigate(['/']);
    this.dialog.closeAll();
  }
  logOut() {
    this.auth.logOut();
  }
}
