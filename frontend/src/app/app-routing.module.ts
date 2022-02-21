import { HistogramaComponent } from './histograma/histograma.component';
import { GraphRamComponent } from './graph-ram/graph-ram.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbolprocesoComponent } from './arbolproceso/arbolproceso.component';
import { ListaprocesosComponent } from './listaprocesos/listaprocesos.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [

  {
    path:'principal',
    component: PrincipalComponent
  },
  {
    path:'histograma',
    component: HistogramaComponent
  },
  {
    path:'arbolprocesos',
    component : ArbolprocesoComponent
  },
  {
    path:'procesos',
    component : ListaprocesosComponent
  },
  {
    path:'graphram',
    component: GraphRamComponent
  },

  {
    path: '',
    redirectTo: '/principal',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
