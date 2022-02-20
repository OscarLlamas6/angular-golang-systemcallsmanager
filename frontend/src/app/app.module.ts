import { ServiciosService } from './servicios/servicios.service';
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
import { HttpClientModule} from '@angular/common/http'

import { ChartModule } from 'angular2-chartjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HistogramaComponent } from './histograma/histograma.component';

@NgModule({
  declarations: [
    AppComponent,
    ArbolprocesoComponent,
    GraphRamComponent,
    ListaprocesosComponent,
    MenuComponent,
    NavComponent,
    PrincipalComponent,
    HistogramaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatSliderModule,
    MatExpansionModule,
  ],
  providers: [ServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
