import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArbolprocesoComponent } from './arbolproceso/arbolproceso.component';
import { GraphRamComponent } from './graph-ram/graph-ram.component';
import { ListaprocesosComponent } from './listaprocesos/listaprocesos.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProcesosComponent } from './procesos/procesos.component';

@NgModule({
  declarations: [
    AppComponent,
    ArbolprocesoComponent,
    GraphRamComponent,
    ListaprocesosComponent,
    MenuComponent,
    NavComponent,
    PrincipalComponent,
    ProcesosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
