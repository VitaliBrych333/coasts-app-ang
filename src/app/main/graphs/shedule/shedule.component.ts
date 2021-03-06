import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { FilterDataService } from '../../../services/filter-data.service';
import { Months } from '../../../shared/constants/months';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.scss']
})

export class SheduleComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public lineChartData: ChartDataSets[];
         lineChartLabels: Label[] = _.map([...Months], (str) => str.slice(0, 3));
         chartDataValue: Label[];
         lineChartOptions: ChartOptions;
         lineChartLegend = true;
         lineChartType = 'line';
         lineChartPlugins = [ pluginAnnotations ];
         lineChartColors: Color[];

  protected readonly subscriptions: Subscription[] = [];

  private arrayIndexArrayScale: number[];
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
    { // turquoise(greenish-blue)
      backgroundColor: 'rgba(64, 214, 202, 0.2)',
      borderColor: 'rgba(64, 214, 202, 1)',
      pointBackgroundColor: 'rgba(64, 214, 202, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(64, 214, 202, 1)',
      pointHoverBorderColor: 'rgba(64, 214, 202, 0.8)'
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

  private stateChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            beginAtZero: true
          }
        },
      ]
    },
  };

  constructor(public filterDataService: FilterDataService) {}

  public ngOnInit(): void {
    this.chartDataValue = _.concat('', this.lineChartLabels);
    this.lineChartColors = this.stateFirstColor;

    this.subscriptions.push(
      this.filterDataService.currentDataCompare.subscribe(data => {
        let countTimesScale = 0;
        let arrayMaxAbsValue = [];
        this.arrayIndexArrayScale = [];
        this.lineChartOptions = this.stateChartOptions;

        this.lineChartData = [
          { data: [], label: '' },
          { data: [], label: '' },
          { data: [], label: '' }
        ];

        if (data.length) {
          data.forEach((value, index) => {
            this.lineChartData[index].data = [...value.values()];
            this.lineChartData[index].label = value.get(12);
          });
        }

    // for scale if values differ more than 10 times
        if (this.lineChartData[1].data.length) {
          const tempArray = [];

          this.lineChartData.map((obj: any) => obj.data.map((num: number) => Math.abs(num)))
                            .forEach((obj, index) => tempArray.push(
                                                                      {
                                                                        'maxNum': _.max(obj),
                                                                        'indexArray': index,
                                                                        'minNum': _.max(obj) > 0
                                                                                    ? _.min(_.filter(obj, num => num > 0))
                                                                                    : _.min(obj)
                                                                      }
                                                                    ));

          const objMaxValue = _.maxBy(tempArray, 'maxNum');
          arrayMaxAbsValue = tempArray.filter(obj => obj['maxNum'] === objMaxValue['maxNum']);

          const arrayMinValues = tempArray.filter(obj => obj['minNum'] > 0
                                                         && !_.includes(_.map(arrayMaxAbsValue, 'indexArray'), obj['indexArray']));

          const objMinValue = arrayMinValues.length ? _.minBy(arrayMinValues, 'minNum')
                                                    : _.minBy(tempArray, 'minNum');

          const arrayMinAbsValue = tempArray.filter(obj => obj['minNum'] === objMinValue['minNum']);
          const valueMax = arrayMaxAbsValue[0];
          const valueMin = arrayMinAbsValue[0];

          if (valueMax['maxNum'] !== 0 && valueMin['minNum'] !== 0) {
            countTimesScale = _.floor(valueMax['maxNum'] / valueMin['minNum']);
          }
        }

        countTimesScale >= 10 ? arrayMaxAbsValue.forEach(obj => this.arrayIndexArrayScale.push(obj['indexArray']))
                              : undefined;
      })
    );
  }

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public scale(): void {
    if (!this.lineChartOptions.scales.yAxes[1]) {
      this.lineChartOptions = this.stateColors;
      this.arrayIndexArrayScale.forEach(num => this.lineChartData[num].yAxisID = 'y-axis-1');

    } else {
      this.lineChartData.forEach(obj => obj.yAxisID = null);
      this.lineChartOptions = this.stateChartOptions;
    }
  }

  public changeColor(): void {
    this.lineChartColors === this.stateFirstColor ? this.lineChartColors = this.stateSecondColor
                                                  : this.lineChartColors = this.stateFirstColor;

    this.lineChartOptions.scales.yAxes[1] ? this.lineChartOptions = this.stateColors
                                          : undefined;
  }

  private get stateColors(): object {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{}],
        yAxes: [
          {
            id: 'y-axis-0',
            position: 'left',
            ticks: {
              beginAtZero: true
            }
          },
          {
            id: 'y-axis-1',
            position: 'right',
            gridLines: {
              color: 'rgba(255,0,0,0.3)',
            },
            ticks: {
              fontColor: this.lineChartColors[this.arrayIndexArrayScale[0]].borderColor,
              beginAtZero: true
            }
          }
        ]
      },
    };
  }
}
