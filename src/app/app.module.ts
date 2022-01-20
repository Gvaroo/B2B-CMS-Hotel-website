import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { MaterialUiModule } from './material-ui.module';
import { HeaderComponent } from './shared/header/header.component';
import { LoginFormComponent } from './view-helpers/login-form/login-form.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { RegistrationPgComponent } from './view/registration-pg/registration-pg.component';
import { HomePgComponent } from './view/home-pg/home-pg.component';
import { AuthService } from './shared/services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    RegistrationPgComponent,
    HomePgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HotToastModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}