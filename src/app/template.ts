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