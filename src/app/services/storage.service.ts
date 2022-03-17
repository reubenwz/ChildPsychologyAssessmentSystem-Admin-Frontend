import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public storeData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public retrieveData(key: string): string | null {
    return localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public storeJsonData<T>(key: string, value: T): void {
    this.storeData(key, JSON.stringify(value));
  }

  public retrieveJsonData<T>(key: string): T {
    return JSON.parse(this.retrieveData(key) || '[]');
  }
}
