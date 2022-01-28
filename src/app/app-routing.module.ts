import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelPgComponent } from './view/add-hotel-pg/add-hotel-pg.component';
import { DiscountPgComponent } from './view/discount-pg/discount-pg.component';
import { HomePgComponent } from './view/home-pg/home-pg.component';
import { RegistrationPgComponent } from './view/registration-pg/registration-pg.component';
import { AddRoomPgComponent } from './view/show-rooms-pg/add-room-pg/add-room-pg.component';
import { ShowRoomsPgComponent } from './view/show-rooms-pg/show-rooms-pg.component';

const routes: Routes = [
  { path: '', component: HomePgComponent },
  { path: 'register', component: RegistrationPgComponent },
  { path: 'add-hotel', component: AddHotelPgComponent },
  { path: 'show-rooms/:name/:id', component: ShowRoomsPgComponent },
  { path: 'add-room/:name/:id', component: AddRoomPgComponent },
  { path: `discounts/:name/:id`, component: DiscountPgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
