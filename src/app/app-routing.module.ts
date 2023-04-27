import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AccountComponent } from './account/account.component';
import { DepositComponent } from './account/deposit/deposit.component';
import { WithdrawComponent } from './account/withdraw/withdraw.component';
import { MovementsComponent } from './account/movements/movements.component';
import { ForgotMyPasswordComponent } from './auth/forgot-my-password/forgot-my-password.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'account/deposit', component: DepositComponent, canActivate: [AuthGuard]},
  { path: 'account/withdraw', component: WithdrawComponent, canActivate: [AuthGuard]},
  { path: 'account/movements', component: MovementsComponent, canActivate: [AuthGuard]},
  { path: 'forgot-my-password', component: ForgotMyPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
