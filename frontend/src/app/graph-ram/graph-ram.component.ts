import { ServiciosService } from './../servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { Chart,ChartType } from 'chart.js';
@Component({
  selector: 'app-graph-ram',
  templateUrl: './graph-ram.component.html',
  styleUrls: ['./graph-ram.component.css']
})
export class GraphRamComponent implements OnInit {

  constructor(public servicio:ServiciosService) { }
/**
	* Interval to update the chart
	* @var {any} intervalUpdate
	*/
	private intervalUpdate: any = null;

	/**
	* The ChartJS Object
	* @var {any} chart
	*/
	public chart: any = null;
  porcentaje = ""
	/**
	* On component initialization
	* @function ngOnInit
	* @return {void}
	*/
	 ngOnInit(): void {
		this.chart = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: '% utilización de RAM',
					fill: false,
					data: [],
					backgroundColor: '#168ede',
					borderColor: '#168ede'
				  }
				]
			  },
			  options: {
				tooltips: {
					enabled: false
				},
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						fontColor: 'black'
					}
				},
				scales: {
				  yAxes: [{
					  ticks: {
						  fontColor: "black"
					  }
				  }],
				  xAxes: [{
					ticks: {
						fontColor: "black",
						beginAtZero: true
					}
				  }]
				}
			  }
		});

		this.showData();

		this.intervalUpdate = setInterval(function(this:GraphRamComponent){
			this.showData();
		}.bind(this), 1000);
	}

	/**
	* On component destroy
	* @function ngOnDestroy
	* @return {void}
	*/
	 ngOnDestroy(): void {
		clearInterval(this.intervalUpdate);
	}

	/**
	* Print the data to the chart
	* @function showData
	* @return {void}
	*/
	 showData(): void {
		this.getFromAPI().subscribe((response:any) => {

			if(response.error === false || response.error == undefined) {
				let chartTime: any = new Date();
				chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
				if(this.chart.data.labels.length > 15) {
						this.chart.data.labels.shift();
						this.chart.data.datasets[0].data.shift();
				}
				this.chart.data.labels.push(chartTime);
        this.porcentaje = response.porcentaje+"%"
				this.chart.data.datasets[0].data.push(response.porcentaje);
				this.chart.update();
			} else {
				console.error("ERROR: The response had an error, retrying");
			}
		}, (error: any) => {
			console.error("ERROR: Unexpected response");
		});
	}

	/**
	* Get the data from the API
	* @function getFromAPI
	* @return {Observable<any>}
	*/
	private getFromAPI(){
	  return this.servicio.getInfoRam()
	}

}
