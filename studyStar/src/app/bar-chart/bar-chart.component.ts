import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
// import Chart from 'chart.js/auto';
Chart.register(...registerables)

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: false,
})
export class BarChartComponent implements OnInit {
  public chart: any;
  @ViewChild('MyChart') myChart: any

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.createChart();

  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: "Minutes Per Day",
            data: [10, 35, 21, 80, 50, 5, 30],
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5
      }
    });
  }
}
