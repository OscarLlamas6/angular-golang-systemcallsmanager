import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.css']
})
export class HistogramaComponent implements OnInit {




  myBarChart:any
  constructor() { }

  ngOnInit(): void {
    const canvas = <HTMLCanvasElement> document.getElementById('histogram');
    const ctx = canvas.getContext('2d');


    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [0, 1, 2, 3, 4],
        datasets: [{
          label: 'Number of Arrivals',
          data: [19],
          backgroundColor: "green"
        },
        {

          data: [35],

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
