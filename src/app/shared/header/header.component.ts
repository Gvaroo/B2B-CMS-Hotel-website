import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from 'src/app/view-helpers/login-form/login-form.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(LoginFormComponent, {
      panelClass: 'header-dialog',
      position: { right: '0' },
    });
  }
  ngOnInit(): void {}
}
