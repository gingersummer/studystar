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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: "Sales",
            data: [120, 150, 180, 200, 170],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: [80, 100, 140, 160, 130],
            backgroundColor: 'green'
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
