import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { FilterDataService } from '../../../services/filter-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.css']
})
export class SheduleComponent implements OnInit {

  public lineChartData: ChartDataSets[];

  public lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            beginAtZero: true
          }
        },
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   gridLines: {
        //     color: 'rgba(255,0,0,0.3)',
        //   },
        //   ticks: {
        //     fontColor: 'red',
        //     beginAtZero: true
        //   }
        // }
      ]
    },
  };
  private color: Color[] = [
    { // orange
      backgroundColor: 'rgba(255, 191, 0, 0.2)',
      borderColor: 'rgba(255, 191, 0, 1)',
      pointBackgroundColor: 'rgba(255, 191, 0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(255, 191, 0, 1)',
      pointHoverBorderColor: 'rgba(255, 191, 0, 0.8)'
    },
    { // blue
      backgroundColor: 'rgba(0, 128, 255, 0.2)',
      borderColor: 'rgba(0, 128, 255, 1)',
      pointBackgroundColor: 'rgba(0, 128, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(0, 128, 255, 1)',
      pointHoverBorderColor: 'rgba(0, 128, 255, 0.8)'
    },
    { // red
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderColor: 'rgba(255, 0, 0, 1)',
      pointBackgroundColor: 'rgba(255, 0, 0, 0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(255, 0, 0, 1)',
      pointHoverBorderColor: 'rgba(255, 0, 0, 0, 0.8)'
    },
    { // green
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      borderColor: 'rgba(0, 255, 0, 1)',
      pointBackgroundColor: 'rgba(0, 255, 0, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(0, 255, 0, 1)',
      pointHoverBorderColor: 'rgba(0, 255, 0, 0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77, 83, 96, 0.2)',
      borderColor: 'rgba(77, 83, 96, 1)',
      pointBackgroundColor: 'rgba(77, 83, 96, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(77, 83, 96, 1)',
      pointHoverBorderColor: 'rgba(77, 83, 96, 0.8)'
    },
    { // violet
      backgroundColor: 'rgba(255, 0, 255, 0.2)',
      borderColor: 'rgba(255, 0, 255, 1)',
      pointBackgroundColor: 'rgba(255, 0, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(255, 0, 255, 1)',
      pointHoverBorderColor: 'rgba(255, 0, 255, 0.8)'
    }
  ];

  private stateFirstColor = this.color.slice(0, 3);
  private stateSecondColor = this.color.slice(3);

  public lineChartColors: Color[] = this.stateFirstColor;
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(public filterDataService: FilterDataService) { }

  ngOnInit() {
    this.filterDataService.currentDataCompare.subscribe(data => {

      this.lineChartData = [
        { data: [], label: '' },
        { data: [], label: '' },
        { data: [], label: '' }
      ];
// yAxisID: 'y-axis-1'
      if (data.length) {
        data.forEach((value, index) => {
           let newData = Array.from(value.values()).slice(0, 12);
           let newLabel = value.get(12);
           this.lineChartData[index].data = newData;
           this.lineChartData[index].label = newLabel;
        });
      }

    });
  }

  // public randomize(): void {
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       this.lineChartData[i].data[j] = this.generateNumber(i);
  //     }
  //   }
  //   this.chart.update();
  // }

  // private generateNumber(i: number) {
  //   return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  // }

  // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public hideOne() {
  //   const isHidden = this.chart.isDatasetHidden(1);
  //   this.chart.hideDataset(1, !isHidden);
  // }
// TODO find max number in data by module
  public scale() {
    const scale =  {
      id: 'y-axis-1',
      position: 'right',
      gridLines: {
        color: 'rgba(255,0,0,0.3)',
      },
      ticks: {
        fontColor: 'red',
        beginAtZero: true
      }
    };

    this.lineChartOptions.scales.yAxes.push(scale);
    this.lineChartData.forEach(obj => obj.data.forEach(data => +data))
    // let f = _.maxBy(this.lineChartData, (obj) => obj.data)
    // console.log('ffffffff', f)

  }

  public changeColor() {
    if (this.lineChartColors === this.stateFirstColor) {
      this.lineChartColors = this.stateSecondColor;
    } else {
      this.lineChartColors = this.stateFirstColor;
    }
  }

  // public changeLabel() {
  //   this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  //   // this.chart.update();
  // }
}
