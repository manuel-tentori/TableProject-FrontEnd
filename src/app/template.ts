export class Custom {
    id: number;
    Title: string;
    Revenue: number;
    DateStart: number;
    DateEnd: number;
}

export class Week {
    ID: number;
    ProgressPercWeek: number;
    PartialRevenue: number;
  }
  
export class Data {
    isChecked: boolean;
    rif: number;
    title: string;
    revenue: number;
    progessperc: number;
    datestart: number;
    dateend: number;
    weeks: Week[];
  
    constructor() {
      this.weeks = [];
    }
  }

