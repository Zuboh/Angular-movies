import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/auth/login/login.pages';
import { SignupPage } from './pages/auth/signup/signup.pages';
import { HomePage } from './pages/home/home.pages';
import { InfoPage } from './pages/home/info.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginPage,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupPage,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    pathMatch: 'full'
  },
  {
    path: 'info',
    component: InfoPage,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
