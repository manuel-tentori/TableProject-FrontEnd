import { Injectable } from '@angular/core';
import {MatNativeSelectHarness} from "@angular/material/input/testing";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  open(msg: string, duration: number){
    this.snackbar.open(msg, "Chiudi",{
      duration:duration*1000
    })
  }
}
