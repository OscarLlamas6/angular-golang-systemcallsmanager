import { ServiciosService } from './../servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
@Component({
  selector: 'app-arbolproceso',
  templateUrl: './arbolproceso.component.html',
  styleUrls: ['./arbolproceso.component.css']
})
export class ArbolprocesoComponent implements OnInit {

  info : any[] = [];
  panelOpenState = false;

  constructor(private servicio: ServiciosService) { }

  ngOnInit(): void {
    let html =""
    this.actualizar()
    interval(10000)
    .pipe(takeWhile(() => true))
    .subscribe(() => {
    this.info = []
    this.actualizar()
    });
  }


  actualizar(){
      this.servicio.getProcesos().subscribe((resultado:any)=>{
        //console.log(resultado.procesos)
        resultado.procesos.forEach((element:any) => {
          let hh: { nombre: any; pid: any; }[] =[]
          let num =0;
          element.hijos.forEach((hijitos:any) => {
            num = num+1;
            let hijos = {
              nombre:hijitos.nombre,
              pid:hijitos.pid
            }
            hh.push(hijos)
          });
          let rram = "-"
          if (element.ram!=undefined){
          let rram1 = Number(element.ram)/1000000
          rram1 = Number((rram1*100/2985.52).toFixed(3))
          rram = String(rram1)
          }

          let item  ={
            nombre : element.nombre,
            pid : element.pid,
            ram : rram,
            estado: element.estado,
            hijos : hh,
            num : num
          }
          this.info.push(item)
        });
      })
  }

}


