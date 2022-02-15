import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  total:any = "";
  totalm : any = ""
  usada: any ="";
  libre : any ="";
  cache : any ="";
  porcentaje : any ="";
  porcentajeLibre:any = "";
  por = "";

  constructor() { }

  ngOnInit(): void {
  }

}
