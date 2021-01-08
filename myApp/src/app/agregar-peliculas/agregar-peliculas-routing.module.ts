import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarPeliculasPage } from './agregar-peliculas.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarPeliculasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarPeliculasPageRoutingModule {}
