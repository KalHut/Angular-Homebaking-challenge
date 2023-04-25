import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  password: string;
  ammount: number;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent  implements OnInit {
  isLoading: boolean = false;
  usersLists: User[] = []; // list of users.
  signupObject: User = { // form data that will be used to create a new local user.
    name: '',
    email: '',
    password: '',
    ammount: 0
  }

  constructor(private router: Router){}

  ngOnInit(): void {}

  signup() {
    this.isLoading = true;

    this.usersLists = JSON.parse(localStorage.getItem("usersLists") ?? "[]") as User[]; // Get the users list from local storage. if local storage does not contain users list it will be empty array.
    const foundUser = this.usersLists.find(user => user.email === this.signupObject.email); // Check if the email is already in the users list.

    if (foundUser) {
      alert("Email already exists!");
      this.isLoading = false;
      return;
    }

    this.usersLists.push(this.signupObject); // Add signup user to users list.
    localStorage.setItem("usersLists", JSON.stringify(this.usersLists));

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000)
  }
}