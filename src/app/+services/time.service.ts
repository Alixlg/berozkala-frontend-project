import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private date = new Date();
  private time = this.date.toLocaleTimeString();

  getTime() {
    return this.time;
  }

  updateTime() {
    this.time = new Date().toLocaleTimeString();
  }

  constructor() {
    setInterval(() => this.updateTime(), 1000);
  }
}
