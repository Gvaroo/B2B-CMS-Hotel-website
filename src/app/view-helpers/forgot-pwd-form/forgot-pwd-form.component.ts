import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-forgot-pwd-form',
  templateUrl: './forgot-pwd-form.component.html',
  styleUrls: ['./forgot-pwd-form.component.css'],
})
export class ForgotPwdFormComponent implements OnInit {
  constructor(private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit(): void {}
  onFormSubmit(form: NgForm) {
    this.auth.forgotPassword(form.value.email);
  }
  backButton() {
    this.dialog.closeAll();
    this.dialog.open(LoginFormComponent, {
      panelClass: 'header-dialog',
      position: { right: '0' },
    });
  }
}
