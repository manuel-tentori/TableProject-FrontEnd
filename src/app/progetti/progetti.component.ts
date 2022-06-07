import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Custom } from "../template";
import { NotificationService } from "../notification.service";
import { DataService } from "../data.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import {Week, Data} from "../template";
import { Observable, throwError } from 'rxjs';
import DataJson from "../data.json";
import { map } from 'rxjs/operators';

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

  public datas: Data[];
    
  isChecked: boolean;
  isMasterSel: any;

  getFriends(){
    this.httpClient.get<any>('http://localhost:8080/api/v1/table').subscribe(
      (response: any[]) => {
    
        console.log(response);
        this.datas = response;
      }
    );
  }

  
  constructor(private httpClient: HttpClient, private notification: NotificationService) {}

  ngOnInit() {
    $("#perc").keyup(function () {
      var value = $(this).val();
    });

    this.getFriends();
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
        let i = this.datas[0].weeks.length;
        w.ID = i;
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

  AddProject(f: NgForm) {
    const DataClone = Object.assign([], this.newData);
    let w = new Week();
    w.ProgressPercWeek = null;
    w.PartialRevenue = null;
    this.newData.weeks.push(w);
    this.datas.push(DataClone);

    this.flagApertaAddProject = false;

  };
  

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/api/v1/table';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
  }
}


function isChecked(name: void, string: any, isChecked: any, boolean: any) {
  throw new Error("Function not implemented.");
}