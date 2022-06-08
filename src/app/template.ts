export class Custom {
    id: number;
    title: string;
    revenue: number;
    datestart: string;
    dateend: string;
}

export class Week {
    id: number;
    ProgressPercWeek: number;
    PartialRevenue: number;
  }
  
export class Data {
    isChecked: boolean;
    rif: number;
    title: string;
    revenue: number;
    progessperc: number;
    datestart: string;
    dateend: string;
    weeks: Week[];
  
    constructor() {
      this.weeks = [];
    }
  }

