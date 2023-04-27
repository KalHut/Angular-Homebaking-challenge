import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth.service';

@Component({
  selector: 'app-forgot-my-password',
  templateUrl: './forgot-my-password.component.html',
  styleUrls: ['./forgot-my-password.component.css']
})
export class ForgotMyPasswordComponent implements OnInit {

  constructor(private router: Router){}

  isLoading: boolean = false;

  usersLists: User[] = []; // list of users.
  resetPasswordObject: Pick<User, "email" | "password"> = {
    email: '',
    password: ''
  }

  ngOnInit(): void {}

  resetPassword() {
    this.isLoading = true;

    this.usersLists = JSON.parse(localStorage.getItem("usersLists") ?? "[]") as User[]; // Get the users list from local storage. if local storage does not contain users list it will be empty array.

    this.usersLists.map(user => {
      if (user.email === this.resetPasswordObject.email) {
        user.password = this.resetPasswordObject.password
      }
    })

    localStorage.setItem("usersLists", JSON.stringify(this.usersLists));

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000)
  }
}

