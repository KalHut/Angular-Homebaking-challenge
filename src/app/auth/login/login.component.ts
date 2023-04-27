import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  constructor(private authService: AuthService, private router: Router){}

  isLoading: boolean = false;

  usersLists: User[] = []; // list of users.
  loginObject: Pick<User, "email" | "password"> = {
    email: '',
    password: ''
  }

  ngOnInit(): void {}

  login() {
    this.isLoading = true;

    this.usersLists = JSON.parse(localStorage.getItem("usersLists") ?? "[]") as User[]; // Get the users list from local storage. if local storage does not contain users list it will be empty array.
    const foundUser = this.usersLists.find(user => user.email === this.loginObject.email); // Check if the email is already in the users list.

    if (!foundUser || foundUser.password !== this.loginObject.password) { // If the user does not exist or if the password dont match
      alert("Email or password incorrect. Please try again");
      this.isLoading = false;
      return;
    }

    this.authService.authenticate(foundUser);

    setTimeout(() => {
      this.router.navigate(['/account']);
    }, 1000)
  }
}
