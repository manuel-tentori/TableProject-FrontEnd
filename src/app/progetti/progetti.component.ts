import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { NotificationService } from "../notification.service";
import { DataService } from "../data.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Week, Data, DataForm } from "../template";
import axios from "axios";
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

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
  public newData : Data = new Data();  
  public MaxWeeksProject: Data;
  public datas: any = [];
  public ready = false;

  public WeekHeader: any = [];

  //public datas: any = DataJson;
  isChecked: boolean;
  isMasterSel: any;

  constructor(
    private _data: DataService,
    private httpClient: HttpClient,
    private notification: NotificationService
  ) {}

  async getData() {
    const res = await axios.get("http://localhost:8080/api/v1/table");
    return await res.data;
  }

  ngOnInit() {
    this.getData().then((data) => {
      this.datas = data;
      this.rif();
      this.trovaMaxSett();
    });

    $("#perc").keyup(function () {
      var value = $(this).val();
    });
  }

  public trovaMaxSett() {
    let max = 0;
    this.datas.forEach((project) => {
      if ([...project.weeks].length > max) {
        max = project.weeks.lenght;
        this.MaxWeeksProject = project;
        this.ready = true;
      }
      console.log(this.MaxWeeksProject);
    });
  }

  AllCheckFalse() {
    this.selectedAll = false;
    this.datas.forEach((d) => {
      d.isChecked = false;
    });
  }

  selectAll() {
    this.selectedAll = true;
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

    // for (let k = 0; k < this.datas.length; k++) {
    //   if (this.datas[k].isChecked == false) {
    //     this.notification.open("Non è stato selezionato nessun progetto", 2);
    //   }
    // }
  }

  rif() {
    for (let k = 0; k < this.datas.length; k++) {
      this.datas[k].rif = k + 1;
      this.datas[k].push;
      console.log(k);
    }
  }

  EditProject() {
    for (let k = 0; k < this.datas.length; k++) {
      if (this.datas[k].isChecked == true) {
        console.log(this.datas[k].id);
        axios
          .delete("http://localhost:8080/api/v1/table/" + this.datas[k].id)
          .then(() => {
            this.notification.open("Progetto eliminato con successo", 2);
          });

        this.ngOnInit();
      } else {
        //this.notification.open("Non è stato selezionato nessun progetto", 2);
      }
    }

    this.flagApertaAddProject = false;
    this.AllCheckFalse();
  }

  DeleteProject() {
    for (let k = 0; k < this.datas.length; k++) {
      if (this.datas[k].isChecked == true) {
        console.log(this.datas[k].id);
        axios
          .delete("http://localhost:8080/api/v1/table/" + this.datas[k].id)
          .then(() => {
            this.notification.open("Progetto eliminato con successo", 0.3);
            this.ngOnInit();
          });

        this.ngOnInit();
      } else {
        //this.notification.open("Non è stato selezionato nessun progetto", 2);
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
        this.notification.open("Selezionare solo un progetto", 1);
      } else {
        // this.notification.open("Non è stato selezionato nessun progetto", 2);
      }
    }
  }

  back() {
    this.flagAperta = false;
    this.flagApertaAddProject = false;
    this.flagApertaEditProject = false;
  }

    AddProject() {
      // console.log(this.newData);
      // this.flagApertaAddProject = false;
      // axios({
      //   method: 'post',
      //   url: 'http://localhost:8080/api/v1/table',
      //   data: {
      //     title: this.newData,
      //   }
      // });
      // this.flagApertaAddProject = false;
      // this.ngOnInit();
    }



  }

function isChecked(name: void, string: any, isChecked: any, boolean: any) {
  throw new Error("Function not implemented.");
}

function typeOf(data: any): any {
  throw new Error("Function not implemented.");
}
