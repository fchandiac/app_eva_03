import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './home/home.component';
import { NuevoRegistroComponent } from './nuevo-registro/nuevo-registro.component';
import { ListarRegistrosComponent } from './listar-registros/listar-registros.component';
import { DetalleRegistroComponent } from './detalle-registro/detalle-registro.component';
import { ActualizarRegistroComponent } from './actualizar-registro/actualizar-registro.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registro/nuevo', component: NuevoRegistroComponent },
  { path: 'registro/listar-todos', component: ListarRegistrosComponent },
  { path: 'resgistro/detalle/:id', component: DetalleRegistroComponent },
  { path: 'resgistro/actualizar/:id', component: ActualizarRegistroComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NuevoRegistroComponent,
    HomeComponent,
    ListarRegistrosComponent,
    DetalleRegistroComponent,
    ActualizarRegistroComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
