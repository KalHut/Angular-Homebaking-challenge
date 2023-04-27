import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private authService: AuthService){}

  get user() { //returns true if logged in to be used to define which buttons to display
    return this.authService.getUser;
  }
}
