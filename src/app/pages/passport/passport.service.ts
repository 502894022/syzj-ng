import { LocalStorageService } from './../../shared/local-storage.service';
import { Injectable } from '@angular/core';
import { Signup } from './signup/signup';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(private localStorageService: LocalStorageService) { }
  public addUser(signup: Signup): boolean{
    // 验证手机号码是否唯一
    // return false;
    let users: User[];
    const user = {
      id: 1,
      phone: signup.phone
    };
    users = this.localStorageService.get('TUser', []);
    users.push(user);
    this.localStorageService.set('TUser', users);
    let accounts: LoginAccount[];
    accounts = this.localStorageService.get('TLoginAccount', []);
    const account = {
      userId: 1,
      identifier: signup.email
    };
    accounts.push(account);
    accounts.push({
      userId: 1,
      identifier: signup.phone
    });
    this.localStorageService.set('TLoginAccount', users);
    return true;
  }
}

export interface User {
  id: number;
  phone: string;
}

export interface LoginAccount {
  userId: number;
  identifier: string;
}