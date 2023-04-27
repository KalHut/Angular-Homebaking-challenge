import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {

  constructor(private router: Router, private authService: AuthService){}

  depositValue: number = 0;

  deposit() {
    if (this.depositValue <= 0) {
      alert('Deposit value must be greater than zero.');
      return;
    }

    const user = this.authService.getUser

    const usersLists = JSON.parse(localStorage.getItem("usersLists") ?? "[]") as User[]; // Get the users list from local storage. if local storage does not contain users list it will be empty array.

    usersLists.map(u => {
      if (u.email === user?.email) {
        let now = new Date();

        let day = now.getDate().toString().padStart(2, '0');
        let month = (now.getMonth() + 1).toString().padStart(2, '0');
        let year = now.getFullYear().toString();
        let hour = now.getHours().toString().padStart(2, '0');
        let minute = now.getMinutes().toString().padStart(2, '0');
        let second = now.getSeconds().toString().padStart(2, '0');

        let formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;

        u.ammount += this.depositValue;
        u.movements.unshift({ // add to the beginning of the array
          date: formattedDate,
          type: 'deposit',
          value: this.depositValue,
          startBalance: user.ammount,
          finalBalance: user.ammount + this.depositValue
        })

        this.authService.authenticate(u) // makes sure the user is authenticated and updated
      }
    })

    localStorage.setItem("usersLists", JSON.stringify(usersLists));

    this.router.navigate(['/account']);
  }
}
