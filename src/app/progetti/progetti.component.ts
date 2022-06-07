import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Custom } from "../template";
import { NotificationService } from "../notification.service";
import { SendDataService } from "../send-data.service";
import {Week, Data} from "../template";
import DataJson from "../data.json";

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

  public datas: any[] = DataJson;
    
  isChecked: boolean;
  isMasterSel: any;

  
  constructor(private notification: NotificationService) {}

  ngOnInit() {
    $("#perc").keyup(function () {
      var value = $(this).val();
    });
  }

  /*onChange(index: number, isChecked: boolean) {
    if (isChecked) {
    this.AddWeek(index);
    
    } else {
      this.notification.open("Non è stato selezionato nessun progetto", 2);
    }
  }*/

  AllCheckFalse() {
    this.selectedAll=false;
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
    this.selectedAll = this.datas.every(function(d:any) {
        return d.isChecked == true;
      })
  }


  AddWeek() {
    for (let k = 0; k < this.datas.length; k++) {
      if (this.datas[k].isChecked == true) {
        const w = new Week();
        let i = this.datas[0].Weeks.length;
        w.ID = i;
        w.ProgressPercWeek = null;
        w.PartialRevenue = null;
        this.datas[k].Weeks.push(w);
      }
    }
    this.AllCheckFalse();

    for (let k = 0; k < this.datas.length; k++) {
      if (this.datas[k].isChecked == false) {
        this.notification.open("Non è stato selezionato nessun progetto", 2);
      }
    }

  }

  /*AddWeek(index: number) {
    for (let i=0; i < this.datas.length; i++) {
    if (this.isChecked==true){

    }
    else {
      this.notification.open("Non è stato selezionato nessun progetto", 2);
    }
    const w = new Week();
    let i = this.datas[0].Weeks.length;
    w.ID = i ;
    w.ProgressPercWeek = null;
    w.PartialRevenue = null;
    this.datas[index].Weeks.push(w);
  }*/

  Sum(d: Data): number {
    let sum = 0;
    d.Weeks.forEach((w) => {
      sum += w.PartialRevenue;
    });

    return sum;
  }

  ProgressPerc(d: Data): number {
    let sum = 0;
    d.Weeks.forEach((w) => {
      sum += w.ProgressPercWeek;
    });

    return sum;
  }

  PartialRevenue(d: Data): number {
    let partial;
    d.Weeks.forEach((w) => {
      partial = (d.Revenue / 100) * w.ProgressPercWeek;
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
    this.newData.Weeks.push(w);
    this.datas.push(DataClone);

    this.flagApertaAddProject = false;
  };
  
}


function isChecked(name: void, string: any, isChecked: any, boolean: any) {
  throw new Error("Function not implemented.");
}