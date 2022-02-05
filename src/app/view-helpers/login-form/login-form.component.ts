import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ForgotPwdFormComponent } from '../forgot-pwd-form/forgot-pwd-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    public dialogRef: MatDialogRef<LoginFormComponent>
  ) {}

  ngOnInit(): void {}
  onRegisterBtnClick() {
    this.router.navigate(['/register']);
    this.dialog.closeAll();
  }
  onLoginBtnClick(email: any, password: any) {
    this.auth.signIn(email, password);
    this.dialog.closeAll();
  }
  openDialog() {
    this.dialog.open(ForgotPwdFormComponent, {
      panelClass: 'forgot-pwd-dialog',
      position: { right: '0' },
    });
    this.dialogRef.close();
  }
}
