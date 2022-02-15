import { ServiciosService } from './../servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private ram:ServiciosService) { }
  total:any = "";
  totalm : any = ""
  usada: any ="";
  libre : any ="";
  cache : any ="";
  porcentaje : any ="";
  porcentajeLibre:any = "";
  por = "";
  ngOnInit(): void {
    //{ total: 3057176, usada: 2304560, libre: 99636, cache: 616708, buffer: 36272, porcentaje: 75 }
    interval(1000)
    .pipe(takeWhile(() => true))
    .subscribe(() => {
      this.ram.getInfoRam().subscribe((resultado:any)=>{
        let tot = Number(resultado.total)
        this.totalm = tot/1024
        this.usada = (resultado.usada/1024).toFixed(3);
        this.total = this.totalm.toFixed(2);
        this.libre = (resultado.libre/1024).toFixed(3);
        this.cache = (resultado.cache/1024).toFixed(3);
        this.porcentaje = Number(resultado.porcentaje).toFixed(3);
        this.porcentajeLibre = 100-this.porcentaje;
        this.por = "width: "+this.porcentaje+"%;"
      })
    });



  }

}
