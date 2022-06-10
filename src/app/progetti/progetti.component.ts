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
import { ObserversModule } from "@angular/cdk/observers";

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
  public flagApertaEditProject = false;
  public showMyContainer: boolean = false;
  public newData: Data = new Data();
  public MaxWeeksProject: Data;
  public datas: any = [];
  public ready = false;

  public WeekHeader: any = [];

  //public datas: any = DataJson;
  isChecked: boolean;
  isMasterSel: any;

  loadProjects() {
    return axios.get("http://localhost:8080/api/v1/table/");
  }

  constructor(
    private _data: DataService,
    private httpClient: HttpClient,
    private notification: NotificationService
  ) {
    this.loadProjects();
  }

  ngOnInit() {
    Promise.all([this.loadProjects()]).then((response) => {
    response[0].data.forEach(element => {
        this.datas.push(element);
      });;
    }).then( ()=> (this.trovaMaxSett()));

    $("#perc").keyup(function () {
      var value = $(this).val();
    });
  }

  public trovaMaxSett() {
let promise = new Promise(function(resolve, reject){
  let max = 0;
  this.datas.forEach((project) => {
    if (project.weeks.lenght > max) {
      max = project.weeks.lenght;
      this.MaxWeeksProject = project;
      resolve(true);
    }
  });
});
  promise.then( (result)=> {
    if(result)
    this.ready=true;
  })
    console.log(this.MaxWeeksProject);
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
        this.trovaMaxSett();
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
    axios.delete("http://localhost:8080/api/v1/table/").then((response) => {
      console.log(response);
    });
    this.notification.open("Non è stato selezionato nessun progetto", 2);

    this.flagApertaAddProject = false;
    this.AllCheckFalse();
  }

  DeleteProject() {
    for (let k = 0; k < this.datas.length; k++) {
      if (this.datas[k].isChecked == true) {
        axios.delete("http://localhost:8080/api/v1/table/").then((response) => {
          console.log(response);
        });
        this.notification.open("Progetto eliminato con successo", 2);
      } else {
        this.notification.open("Non è stato selezionato nessun progetto", 2);
      }
    }
    this.AllCheckFalse();
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

  OpenEditProject() {
    for (let k = 0; k < this.datas.length; k++) {
      if (this.datas[k].isChecked == true) {
        this.flagApertaAddProject = true;
      } else if (this.datas.isChecked == true) {
        this.notification.open("Selezionare solo un progetto", 2);
      } else {
        this.notification.open("Non è stato selezionato nessun progetto", 2);
      }
    }
  }

  back() {
    this.flagAperta = false;
    this.flagApertaAddProject = false;
    this.flagApertaEditProject = false;
  }

  AddProject() {
    const DataClone = Object.assign([], this.newData);
    DataClone.progessperc = 0;
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
