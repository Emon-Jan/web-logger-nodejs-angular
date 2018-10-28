import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material';

import * as Highcharts from "highcharts";
import { WebService } from "./web.service";
import { Stat } from "./stat.interface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  filteredMacs: any;        // Used for searching mac address on UI
  data: any;                // Used for receiving data of mac address from API
  macAdd: any;              // Used for receiving mac addresses from API
  stat: Stat;               // Used for receiving data of Summary from API
  startTime: any;           // Used for formating Summary.startTime 
  endTime: any;             // Used for formating Summary.endTime 
  dateTimeRangeZero: any = 0;    // Used for receiving datetime range from UI
  dateTimeRangeOne: any = 0;    // Used for receiving datetime range from UI

  constructor(private webService: WebService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    // Get the summary of net usages visit, mac, start time and end time on UI load
    this.webService.getWebLogSummary()
      .subscribe(
        (res: Stat) => {
          this.stat = res;
          this.startTime = new Date(this.stat.startTime * 1000);
          this.endTime = new Date(this.stat.endTime * 1000);
        },
        err => console.log(err)
      );
  }

  // Get Mac addresses in a given time range and coresponding visit number
  getMac() {
    if (this.dateTimeRangeZero === 0 && this.dateTimeRangeOne === 0) {
      const mes = "Select Date and Time first!"
      this.snackBar.open(mes, "", {
        duration: 2000,
      });
    } else {
      this.filteredMacs = [];
      this.webService.getMacAddressesWithTime(this.dateTimeRangeZero, this.dateTimeRangeOne)
        .subscribe(
          res => {
            this.macAdd = this.filteredMacs = res;
            if (this.filteredMacs == 0) {
              const mes = "Data is not available at this time"
              this.snackBar.open(mes, "", {
                duration: 2000,
              });
            }
          },
          err => console.log(err)
        );
    }
  }

  // Get org name and percent time in a preset date-time range
  showPlot(m, i) {
    if (this.dateTimeRangeZero === 0 && this.dateTimeRangeOne === 0) {
      this.webService.getWebUsages(m.mac)
        .subscribe(
          res => {
            this.data = res;
            if (this.data.length !== 0) {
              let st = new Date(this.data[0].startTime * 1000);
              let et = new Date(this.data[this.data.length - 1].endTime * 1000);
              this.createChart(this.data, m, st, et); // Draw Pie chart using percentage no of visit of a specific mac
            } else {
              const mes = m.mac + " has no user data!"
              this.snackBar.open(mes, "", {
                duration: 2000,
              });
            }
          },
          err => console.log(err)
        );
    } else {
      this.webService.getWebUsages(m.mac, this.dateTimeRangeZero, this.dateTimeRangeOne)
        .subscribe(
          res => {
            this.data = res;
            if (this.data.length !== 0) {
              let st = new Date(this.data[0].startTime * 1000);
              let et = new Date(this.data[this.data.length - 1].endTime * 1000);
              this.createChart(this.data, m, st, et); // Draw Pie chart using percentage no of visit of a specific mac
            } else {
              const mes = m.mac + " has no user data!"
              this.snackBar.open(mes, "", {
                duration: 2000,
              });
            }
          },
          err => console.log(err)
        );
    }
  }

  // Filter out the mac address on typing in search feild
  filter(query: string) {
    this.filteredMacs = query
      ? this.macAdd.filter(items =>
        items
          .mac
          .toLowerCase()
          .includes(query.toLowerCase())
      )
      : this.macAdd;
  }

  // Get mac addresses of manually setting date-time range  
  getMacAddress() {
    this.getMac()
  }

  // Get mac addresses of last-week from today
  onWeek() {
    let tdm;
    const week = 7 * 24 * 60 * 60 * 1000; // no of days * 24hours * 60 min * 60 sec * 1000 milisec
    const d = new Date();
    this.dateTimeRangeOne = d;
    const timeInMiliSecond = d.getTime();
    tdm = new Date(timeInMiliSecond - week);
    this.dateTimeRangeZero = tdm;
    this.getMac();
  }

  // Get mac addresses of today
  onToday() {
    let now, tdm;
    const d = new Date();
    this.dateTimeRangeOne = d;
    const timeInMiliSecond = d.getTime(); // Recent time in miliseconds
    const h = d.getHours();
    const m = d.getMinutes();
    if (h > 0) {
      now = h * 60 * 60 * 1000;
      tdm = new Date(timeInMiliSecond - now);
      this.dateTimeRangeZero = tdm;
      this.getMac();
    } else {
      now = m * 60 * 1000;
      tdm = new Date(timeInMiliSecond - now);
      this.dateTimeRangeZero = tdm;
      this.getMac();
    }
  }

  // Get mac addresses of lasthour
  onLastHour() {
    let now, tdm;
    const d = new Date();
    this.dateTimeRangeOne = d;
    const timeInMiliSecond = d.getTime(); // Recent time in miliseconds
    now = 60 * 60 * 1000;
    tdm = new Date(timeInMiliSecond - now);
    this.dateTimeRangeZero = tdm;
    this.getMac();
  }

  // Options for creating Pie chart
  createChart(d: any, m: any, st: any, et: any) {
    Highcharts.chart("container", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      title: {
        text: "Web Usages"
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.2f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.2f} %",
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || "black"
            }
          }
        }
      },
      series: [{
        name: "Brands",
        colorByPoint: true,
        data: d
      }]
    });
  }

}
