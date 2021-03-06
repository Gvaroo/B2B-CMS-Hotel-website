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
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationPgComponent } from './view/registration-pg/registration-pg.component';
import { HomePgComponent } from './view/home-pg/home-pg.component';
import { AuthService } from './shared/services/auth.service';
import { ForgotPwdFormComponent } from './view-helpers/forgot-pwd-form/forgot-pwd-form.component';
import { BannerComponent } from './shared/header/banner/banner.component';
import { AddHotelPgComponent } from './view/add-hotel-pg/add-hotel-pg.component';
import { FullInfoDialogComponent } from './view-helpers/full-info-dialog/full-info-dialog.component';
import { ShowRoomsPgComponent } from './view/show-rooms-pg/show-rooms-pg.component';
import { AddRoomPgComponent } from './view/show-rooms-pg/add-room-pg/add-room-pg.component';
import { AddRoomDialogComponent } from './view-helpers/add-room-dialog/add-room-dialog.component';
import { DiscountPgComponent } from './view/discount-pg/discount-pg.component';
import { DiscountRegistrationDialogComponent } from './view-helpers/discount-registration-dialog/discount-registration-dialog.component';
import { PricePolicyPgComponent } from './view/price-policy-pg/price-policy-pg.component';
import { AddPriceDialogComponent } from './view-helpers/add-price-dialog/add-price-dialog.component';
import { EditRoomPriceDialogComponent } from './view-helpers/edit-room-price-dialog/edit-room-price-dialog.component';
import { BookingPgComponent } from './view/booking-pg/booking-pg.component';
import { ResponsiveHeaderDialogComponent } from './shared/header/responsive-header-dialog/responsive-header-dialog.component';
import { PrivacyPolicyPgComponent } from './view/privacy-policy-pg/privacy-policy-pg.component';
import { ImageGalleryDialogComponent } from './view-helpers/image-gallery-dialog/image-gallery-dialog.component';
import { RoomImageDialogComponent } from './view-helpers/room-image-dialog/room-image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    RegistrationPgComponent,
    HomePgComponent,
    ForgotPwdFormComponent,
    BannerComponent,
    AddHotelPgComponent,
    FullInfoDialogComponent,
    ShowRoomsPgComponent,
    AddRoomPgComponent,
    AddRoomDialogComponent,
    DiscountPgComponent,
    DiscountRegistrationDialogComponent,
    PricePolicyPgComponent,
    AddPriceDialogComponent,
    EditRoomPriceDialogComponent,
    BookingPgComponent,
    ResponsiveHeaderDialogComponent,
    PrivacyPolicyPgComponent,
    ImageGalleryDialogComponent,
    RoomImageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HotToastModule.forRoot(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
