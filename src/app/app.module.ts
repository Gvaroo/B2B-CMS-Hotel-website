import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModule } from './material-ui.module';
import { HeaderComponent } from './shared/header/header.component';
import { LoginFormComponent } from './view-helpers/login-form/login-form.component';
import { FooterComponent } from './shared/footer/footer.component';
@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginFormComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
