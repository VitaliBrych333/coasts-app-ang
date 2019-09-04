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

  private arrayIndexArrayScale: number[];

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
      let countTimesScale = 0;
      let arrayMaxAbsValue = [];
      this.arrayIndexArrayScale = [];

      this.lineChartData = [
        { data: [], label: '' },
        { data: [], label: '' },
        { data: [], label: '' }
      ];
// yAxisID: 'y-axis-1'
      if (data.length) {
        data.forEach((value, index) => {
           const newData = Array.from(value.values()).slice(0, 12);
           const newLabel = value.get(12);
           this.lineChartData[index].data = newData;
           this.lineChartData[index].label = newLabel;
        });
      }

// it's for scale if values differ more than 10 times
      if (this.lineChartData[1].data.length) {
        const tempArray = [];

        this.lineChartData.map((obj: any) => obj.data.map((num: number) => Math.abs(num)))
                          .forEach((obj, index) => tempArray.push(
                                                                    {
                                                                      'maxNum': _.max(obj),
                                                                      'indexArray': index,
                                                                      'minNum': obj.filter((num: number) => num > 0).length
                                                                                  ? _.min(obj.filter((num: number) => num > 0))
                                                                                  : _.min(obj),
                                                                    }
                                                                  ));

        const objMaxValue = _.maxBy(tempArray, 'maxNum');
        const objMinValue = tempArray.filter(obj => obj['minNum'] > 0).length
            ? _.minBy(tempArray.filter(obj => obj['minNum'] > 0), 'minNum')
            : _.minBy(tempArray, 'minNum');

        arrayMaxAbsValue = tempArray.filter(obj => obj['maxNum'] === objMaxValue['maxNum']);
        const arrayMinAbsValue = tempArray.filter(obj => obj['minNum'] === objMinValue['minNum']);

        if (arrayMaxAbsValue[0]['maxNum'] !== 0 && arrayMinAbsValue[0]['minNum'] !== 0 ) {
          countTimesScale = _.floor(arrayMaxAbsValue[0]['maxNum'] / arrayMinAbsValue[0]['minNum']);
        }
      }

      if (countTimesScale >= 10) {
        arrayMaxAbsValue.forEach(obj => this.arrayIndexArrayScale.push(obj['indexArray']));
      }
    });
  }

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

  }

  public changeColor() {
    if (this.lineChartColors === this.stateFirstColor) {
      this.lineChartColors = this.stateSecondColor;
    } else {
      this.lineChartColors = this.stateFirstColor;
    }
  }
}
