import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Custom } from "../template";
import { NotificationService } from "../notification.service";

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
  public flagApertaAddProject = false;
  public showMyContainer: boolean = false;

  public newData: Data = new Data();

  public datas: any[] = [
    {
      ID: 1,
      Title: "Progetto 1",
      Revenue: 1000,
      DateStart: new Date(2022, 1, 1).getTime(),
      DateEnd: new Date(2022, 12, 31).getTime(),
      Weeks: [
        {
          id: 1,
          ProgressPercWeek: null,
          PartialRevenue: null,
        },
      ],
    },
    {
      ID: 2,
      Title: "Progetto 2",
      Revenue: 3450,
      DateStart: new Date(2022, 1, 1).getTime(),
      DateEnd: new Date(2022, 12, 31).getTime(),
      Weeks: [
        {
          id: 1,
          ProgressPercWeek: null,
          PartialRevenue: null,
        },
      ],
    },
    {
      ID: 3,
      Title: "Progetto 3",
      Revenue: 44250,
      DateStart: new Date(2022, 1, 1).getTime(),
      DateEnd: new Date(2022, 12, 31).getTime(),
      Weeks: [
        {
          id: 1,
          ProgressPercWeek: null,
          PartialRevenue: null,
        },
      ],
    },
    {
      ID: 4,
      Title: "Progetto 4",
      Revenue: 2134,
      DateStart: new Date(2022, 1, 1).getTime(),
      DateEnd: new Date(2022, 12, 31).getTime(),
      Weeks: [
        {
          id: 1,
          ProgressPercWeek: null,
          PartialRevenue: null,
        },
      ],
    },
    {
      ID: 5,
      Title: "Progetto 5",
      Revenue: 9658,
      DateStart: new Date(2022, 1, 1).getTime(),
      DateEnd: new Date(2022, 12, 31).getTime(),
      Weeks: [
        {
          id: 1,
          ProgressPercWeek: null,
          PartialRevenue: null,
        },
      ],
    },
  ];

  constructor(private notification: NotificationService) {}

  ngOnInit() {
    $("#perc").keyup(function () {
      var value = $(this).val();
    });
  }

  onChange(index: number, isChecked: boolean) {
    if (isChecked) {
      const w = new Week();
      let i = this.datas[0].Weeks.length;
      w.ID = i ;
      w.ProgressPercWeek = null;
      w.PartialRevenue = null;
      this.datas[index].Weeks.push(w);
    
    } else {
      this.notification.open("Non è stato selezionato nessun progetto", 2);
    }
  }

  AddWeek() {
    this.onChange(, true);
  }

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
  }
}

export class Week {
  ID: number;
  ProgressPercWeek: number;
  PartialRevenue: number;
}

export class Data {
  ID: number;
  Title: string;
  Revenue: number;
  ProgessPerc: number;
  DateStart: number;
  DateEnd: number;
  Weeks: Week[];

  constructor() {
    this.Weeks = [];
  }
}
function isChecked(name: void, string: any, isChecked: any, boolean: any) {
  throw new Error("Function not implemented.");
}

