import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration-pg',
  templateUrl: './registration-pg.component.html',
  styleUrls: ['./registration-pg.component.css'],
})
export class RegistrationPgComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onFormSubmit(form: NgForm) {
    this.auth.signUp(
      form.value.email,
      form.value.password,
      form.value.displayName
    );
  }
}
