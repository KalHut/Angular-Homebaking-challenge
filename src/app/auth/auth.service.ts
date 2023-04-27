import { Injectable } from '@angular/core';

export interface Movements {
  date: string;
  type: string;
  value: number;
  startBalance: number;
  finalBalance: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
  ammount: number;
  movements: Movements[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  user: User | null = null;

  get getUser() {
    return this.user;
  }

  isAuthenticated(){
    if (this.user === null) {
      return false;
    } else {
      return true;
    }
  }

  authenticate(user: User) {
    this.user = user;
  }

  logout(){
    this.user = null;
  }
}