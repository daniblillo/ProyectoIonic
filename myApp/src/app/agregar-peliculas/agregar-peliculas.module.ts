import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPeliculasPageRoutingModule } from './agregar-peliculas-routing.module';

import { AgregarPeliculasPage } from './agregar-peliculas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPeliculasPageRoutingModule
  ],
  declarations: [AgregarPeliculasPage]
})
export class AgregarPeliculasPageModule {}
