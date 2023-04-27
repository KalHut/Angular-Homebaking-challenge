import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  constructor(private router: Router, private authService: AuthService){}

  withdrawValue: number = 0;

  withdraw() {
    const user = this.authService.getUser

    if (this.withdrawValue <= 0) {
      alert('Withdraw value must be greater than zero.');
      return;
    }

    if (!user || this.withdrawValue > user.ammount) {
      alert("Withdraw value can't be higher than the ammount available in the account");
      return;
    }

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

        u.ammount -= this.withdrawValue;
        u.movements.unshift({
          date: formattedDate,
          type: 'withdraw',
          value: this.withdrawValue,
          startBalance: user.ammount,
          finalBalance: user.ammount - this.withdrawValue
        })

        this.authService.authenticate(u) // makes sure the user is authenticated and updated
      }
    })
    localStorage.setItem("usersLists", JSON.stringify(usersLists));

    this.router.navigate(['/account']);
  }
}
