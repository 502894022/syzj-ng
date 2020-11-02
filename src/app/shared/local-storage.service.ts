import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: any = window.localStorage;
  constructor() { }
  get(key: string, defaultValue?: any): any {
    let value = this.storage.getItem(key);
    if (key === null || key === ''){
      return defaultValue;
    }
    try{
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    if (value === null && defaultValue) {
      value = defaultValue;
    }
    return value;
  }
  set(key: string, value: any): void {
    if (key !== null && key !== ''){
         this.storage.setItem(key, JSON.stringify(value));
        }
  }
  remove(key: string): void {
    if (key !== null && key !== ''){
    this.storage.removeItem(key);
    }
  }
}
