import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-ram',
  templateUrl: './graph-ram.component.html',
  styleUrls: ['./graph-ram.component.css']
})
export class GraphRamComponent implements OnInit {

  chart = ""
  porcentaje = 0
  constructor() { }

  ngOnInit(): void {
  }

}
