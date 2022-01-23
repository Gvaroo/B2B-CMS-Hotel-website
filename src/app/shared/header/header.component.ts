import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginFormComponent } from 'src/app/view-helpers/login-form/login-form.component';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog, public auth: AuthService) {}

  openDialog() {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      panelClass: 'header-dialog',
      position: { right: '0' },
    });
  }
  ngOnInit(): void {}
  logOut() {
    this.auth.logOut();
  }
}
