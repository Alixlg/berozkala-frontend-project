import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'faDate' })
export class FaDatePipe implements PipeTransform {

  private faNumbers = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  private months = [
    'فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور',
    'مهر','آبان','آذر','دی','بهمن','اسفند'
  ];

  transform(gDate: Date | string | null | undefined): string | null {
    if (gDate === null || gDate === undefined) return null;

    const date = new Date(gDate);
    const { jy, jm, jd } = this.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());

    return `${this.toFaNumber(jd)} ${this.months[jm - 1]} ${this.toFaNumber(jy)}`;
  }

  private toFaNumber(n: number): string {
    return n.toString().split('').map(d => this.faNumbers[+d]).join('');
  }

  private toJalaali(gy: number, gm: number, gd: number) {
    const g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];
    let jy: number;
    let jm: number;
    let jd: number;

    let gy2 = (gm > 2)? (gy + 1) : gy;
    let days = 355666 + (365 * gy) + Math.floor((gy2 + 3)/4) - Math.floor((gy2 + 99)/100) + Math.floor((gy2 + 399)/400) + gd + g_d_m[gm-1];
    jy = -1595 + (33 * Math.floor(days/12053));
    days %= 12053;
    jy += 4 * Math.floor(days/1461);
    days %= 1461;
    if (days > 365) {
      jy += Math.floor((days-1)/365);
      days = (days-1) % 365;
    }
    if (days < 186) {
      jm = 1 + Math.floor(days/31);
      jd = 1 + (days % 31);
    } else {
      jm = 7 + Math.floor((days-186)/30);
      jd = 1 + ((days-186) % 30);
    }

    return { jy, jm, jd };
  }
}
