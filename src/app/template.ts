export class Custom {
    id: number;
    title: string;
    revenue: number;
    datestart: number;
    dateend: number;
}

export class Week {
    id: number;
    ProgressPercWeek: number;
    PartialRevenue: number;
  }
  
export class Data {
  constructor(
    isChecked: boolean,
    rif: number,
    title: string,
    revenue: number,
    progessperc: number,
    datestart: number,
    dateend: number,
    weeks: Week[],
  ) {}
}

