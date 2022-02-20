import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.css']
})
export class HistogramaComponent implements OnInit {

  system_calls:any
  constructor() { }

  ngOnInit(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('histogram');
    const ctx = canvas.getContext('2d');

    let datos = JSON.parse(localStorage.getItem("result"));

    let summary = datos.summary;
    this.system_calls = datos.system_calls
    let summ = []
    let names = []
    summary.forEach(element => {

      summ.push(element.count)
      names.push(element.name)
    });
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: localStorage.getItem("nombre"),
          data: summ,
          backgroundColor: "#1ABC9C"
        },
      ]
      },
      options: {
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              max: 3,
            }
          }, {
            display: true,
            ticks: {
              autoSkip: false,
              max: 4,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
