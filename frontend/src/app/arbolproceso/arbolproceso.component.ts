import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbolproceso',
  templateUrl: './arbolproceso.component.html',
  styleUrls: ['./arbolproceso.component.css']
})
export class ArbolprocesoComponent implements OnInit {

  info : any[] = [];
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}