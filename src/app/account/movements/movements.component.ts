import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent {

  constructor(private authService: AuthService){}

  get dataSource() {
    const user = this.authService.getUser;

    if (user) { // user is authenticated
      return user.movements;
    } else {
      return [];
    }
  }

  displayedColumns: string[] = ['date', 'type', 'value', 'startBalance', 'finalBalance'];

}
