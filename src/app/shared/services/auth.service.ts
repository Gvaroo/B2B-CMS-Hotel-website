import { User } from 'src/app/interfaces/user';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  info: any;

  constructor(
    public afs: AngularFirestore,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
    public toast: HotToastService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse('user');
      }
    });
  }

  // Sign in with email/password
  signIn(email: any, password: any) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified == true) {
          this.ngZone.run(() => {
            this.router.navigate(['']);
          });
          this.SetUserData(result.user);
        } else {
          window.alert('verify your email');
          this.router.navigate(['']);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  signUp(email: any, password: any, name: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            console.log(result.user);
            this.sendVerificationMail();
            this.SetUserData(result.user);
          });
      })

      .catch((error) => {
        window.alert(error.message);
      });
  }
  sendVerificationMail() {
    return this.afAuth.currentUser.then((user) => {
      user?.sendEmailVerification().then(() => {
        this.toast.success(
          'We have sent Email verification link to your email. Please check it'
        );
        this.router.navigate(['']);
      });
    });
  }
  // Reset Forgot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toast.success('Password reset email was sent, check your email');
        this.router.navigate(['log-in']);
      })
      .catch((error) => {
        this.toast.error(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null && user.emailVerified !== false ? true : false;
  }

  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  logOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }
}
