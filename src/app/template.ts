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
    id: string;
    title: string;
    revenue: number;
    progessperc: number;
    dateStart: Date;
    dateEnd: Date;
    weeks: Week[];
  
    constructor() {
      this.weeks = [];
    }
  }

