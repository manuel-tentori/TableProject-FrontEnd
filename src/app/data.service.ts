import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Week, Data} from "./template";
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API_URL = "http://localhost:8080/api/v1/table";

  

  constructor (private httpClient: HttpClient) {}

  dataChange: BehaviorSubject<Data[]> = new BehaviorSubject<Data[]>([]);

  getAllIssues(): void {
    this.httpClient.get<Data[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

}
