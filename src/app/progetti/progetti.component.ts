import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Custom } from "../template";
import { NotificationService } from "../notification.service";
import { DataService } from "../data.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, retry } from "rxjs/operators";
import { Week, Data } from "../template";
import { Observable, throwError } from "rxjs";
import DataJson from "../data.json";
import { map } from "rxjs/operators";
import axios, { Axios } from "axios";
import { parse } from "url";

declare var $: any;

@Component({
  selector: "app-progetti",
  templateUrl: "./progetti.component.html",
  styleUrls: ["./progetti.component.css"],
})
export class ProgettiComponent implements OnInit {
  isShowDiv = false;
  public flagTab = false;
  public flagAperta = false;
  selectedAll: any = false;
  public flagApertaAddProject = false;
  public showMyContainer: boolean = false;
  public newData: Data = new Data();

  public datas: any = [];

  //public datas: any = DataJson;
  isChecked: boolean;
  isMasterSel: any;

  loadProjects() {
    axios.get("http://localhost:8080/api/v1/table/").then((response) => {
      console.log(response.data);
      this.datas = response.data;
    });
  }

  constructor(
    private _data: DataService,
    private httpClient: HttpClient,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    $("#perc").keyup(function () {
      var value = $(this).val();
    });

    //this.getFriends();
    this.loadProjects();
  }

  AllCheckFalse() {
    this.selectedAll = false;
    this.datas.forEach((d) => {
      d.isChecked = false;
    });
  }

  selectAll() {
    for (var i = 0; i < this.datas.length; i++) {
      this.datas[i].isChecked = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.datas.every(function (d: any) {
      return d.isChecked == true;
    });
  }

  AddWeek() {
    for (let k = 0; k < this.datas.length; k++) {
      if (this.datas[k].isChecked == true) {
        const w = new Week();
        let i = this.datas[0].weeks.length;
        w.id = i;
        w.ProgressPercWeek = null;
        w.PartialRevenue = null;
        this.datas[k].weeks.push(w);
      }
    }
    this.AllCheckFalse();

    for (let k = 0; k < this.datas.length; k++) {
      if (this.datas[k].isChecked == false) {
        this.notification.open("Non è stato selezionato nessun progetto", 2);
      }
    }
  }

  EditProject() {
    this.notification.open("Non è stato selezionato nessun progetto", 2);
  }


  DeleteProject() {
    axios.delete('http://localhost:8080/api/v1/table/62a0804db88d0b59ce1f0b54').then((response) => {
      console.log(response)
      this.ngOnInit(); //reload the table
    });
    this.notification.open("Non è stato selezionato nessun progetto", 2);
  }

  Sum(d: Data): number {
    let sum = 0;
    d.weeks.forEach((w) => {
      sum += w.PartialRevenue;
    });

    return sum;
  }

  ProgressPerc(d: Data): number {
    let sum = 0;
    d.weeks.forEach((w) => {
      sum += w.ProgressPercWeek;
    });

    return sum;
  }

  PartialRevenue(d: Data): number {
    let partial;
    d.weeks.forEach((w) => {
      partial = (d.revenue / 100) * w.ProgressPercWeek;
    });

    return partial;
  }

  OpenAddProject() {
    this.flagApertaAddProject = true;
  }

  back() {
    this.flagAperta = false;
    this.flagApertaAddProject = false;
  }

  AddProject() {
    const DataClone = Object.assign([], this.newData);
    let w = new Week();
    w.ProgressPercWeek = null;
    w.PartialRevenue = null;
    this.newData.weeks.push(w);
    this.datas.push(DataClone);

    this.flagApertaAddProject = false;
  }

  onSubmit(f: NgForm) {
    const url = "http://localhost:8080/api/v1/table";
    this.httpClient.post(url, f.value).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  }
}

function isChecked(name: void, string: any, isChecked: any, boolean: any) {
  throw new Error("Function not implemented.");
}

function typeOf(data: any): any {
  throw new Error("Function not implemented.");
}
