import { Injectable } from '@angular/core';
import { User } from '../+shared/User';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private users: User[] = [
    { userName: 'admin', password: '88888888', fullName: 'مدیریت', isActive: true, isAdmin: true, isEnable: true },
    { userName: 'user1', password: '88888888', fullName: '1 کاربر', isActive: true, isAdmin: false, isEnable: true },
    { userName: 'user2', password: '88888888', fullName: 'کاربر 2', isActive: false, isAdmin: false, isEnable: true },
    { userName: 'guest', password: '88888888', fullName: 'میهمان', isActive: false, isAdmin: false, isEnable: false }
  ];

  checkUser(userName: string, password: string) {
    let result = this.users.find(u => u.userName == userName && u.password == password && u.isEnable == true);

    return of(result).pipe(delay(2000));
  }
}
